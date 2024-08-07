import { Text } from "../utils/text-class.utils";

export const Config = {
    base_url: 'http://localhost:3000',
    default_language: 'he',
    app_title: 'shachar - boilerpalte',
    topbar: [
        {
            class: 'button',
            routerLink: '/',
            text: new Text('mines')
        },
        {
            class: 'button',
            routerLink: '/configurations/mines-configurations',
            text: new Text('configurations')
        }
    ]
}