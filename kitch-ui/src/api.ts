import { Money, MoneyJson } from "./money";

export const kitchenId = "1";
export namespace api {

    enum HttpStatus {
        NotFound = 404
    }
    function createFetch() {
        return function (path: string, options?: RequestInit): Promise<Response> {
            return fetch(`http://localhost:3000${path}`, options);
        }
    }

    const call = createFetch();
    export namespace contracts {
        export interface MenuItem {
            id: number;
            name: string;
            description: string;
            price: MoneyJson
        }
    }
    export namespace kitchen {
        export function getMenuItems(kitchenId: string): Promise<contracts.MenuItem[]> {
            return call(`/kitchens/${kitchenId}/menuItems`)
                .then((response) => {
                    if (response.status === HttpStatus.NotFound) {
                        return Promise.resolve([])
                    }
                    return response.json();
                })
                .then((json: { menuItems: contracts.MenuItem[] }) => {
                    const menuItems = json.menuItems.map(item => {
                        const { id, name, description, price } = item;
                        return {
                            id, name, description, price: Money.fromJSON(price)
                        };
                    });
                    return Promise.resolve(menuItems);
                });
        }

        export function saveMenuItem(kitchenId: string, menuItem: contracts.MenuItem) {
            return call(`/kitchens/${kitchenId}/menuItems/${menuItem.id}`, { method: 'PUT', body: JSON.stringify(menuItem) })
                .then((response) => {
                    return response;
                });
        }

        export function deleteMenuItem(kitchenId: string, menuItemId: Number) {
            return call(`/kitchens/${kitchenId}/menuItems/${menuItemId}`, { method: 'DELETE' })
                .then((response) => {
                    return response;
                });
        }
    }
}