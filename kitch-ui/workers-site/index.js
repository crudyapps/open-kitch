import { getAssetFromKV, mapRequestToAsset, serveSinglePageApp } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false
const OneMinute = 60;

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function getFormFields(request) {
  const formData = await request.formData()
  const fields = {}
  for (const entry of formData.entries()) {
    fields[entry[0]] = entry[1]
  }
  return fields;
}

function unauthorizedResponse(url) {
  return new Response("", Response.redirect(`${url.origin}/login.html?failedToLoginPreviously=true`, 302));
}

async function handleEvent(event) {
  const request = event.request;
  const url = new URL(request.url);
  if (url.pathname === '/login' && request.method === 'POST') {
    const users = JSON.parse(USERS).users;
    const formFields = await getFormFields(request);
    const searchResult = users.filter((user) => user.id === formFields.id);
    if (!searchResult || searchResult.length !== 1) {
      return unauthorizedResponse(url);
    }
    const user = searchResult[0];
    if (user.password !== formFields.password) {
      return unauthorizedResponse(url);
    }
    let redirectResponse = new Response("", Response.redirect(`${url.origin}/`, 302));
    redirectResponse.headers.set("Set-Cookie", `__Secure-access_token=some-secret-token; Max-Age=${OneMinute};SameSite=Strict; Secure`);
    return redirectResponse;
  }
  let options = (url.pathname === '/login.html') ? {} : {
    mapRequestToAsset: serveSinglePageApp
  };

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }
    return await getAssetFromKV(event, options)
  } catch (e) {

    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) { }
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}