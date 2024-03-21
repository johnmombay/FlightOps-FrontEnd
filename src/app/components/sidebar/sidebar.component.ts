import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
  id: number;
  name: string;
  path: string;
  label: string;
  category: string;
  show: boolean;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { id: 1, name: 'Dashboard', label: 'Dashboard', category: 'dashboard', show: true, path: '/dashboard', icon: 'dashboard', class: '' },

  { id: 2, name: 'System', label: 'System', category: 'system', show: false, path: '/system', icon: 'dashboard', class: '' },
  { id: 3, name: 'Users', label: 'Users', category: 'system', show: true, path: '/system/users', icon: 'account_circle', class: '' },
  { id: 4, name: 'Airports', label: 'Airports', category: 'system', show: true, path: '/system/airports', icon: 'flight', class: '' },
  { id: 5, name: 'Category', label: 'Category', category: 'system', show: true, path: '/system/category', icon: 'category', class: '' },
  { id: 6, name: 'Cities', label: 'Cities', category: 'system', show: true, path: '/system/cities', icon: 'location_city', class: '' },
  { id: 7, name: 'Countries', label: 'Countries', category: 'system', show: true, path: '/system/countries', icon: 'flag', class: '' },
  { id: 8, name: 'Settings', label: 'Settings', category: 'system', show: true, path: '/system/settings', icon: 'settings', class: '' },

  { id: 9, name: 'Aircraft Type', label: 'Aircraft Type', category: 'aircraft', show: true, path: '/aircraft/aircraft-type', icon: 'view_list', class: '' },
  { id: 10, name: 'Aircrafts', label: 'Aircrafts', category: 'aircraft', show: true, path: '/aircraft/aircrafts', icon: 'flight', class: '' },
  { id: 11, name: 'Maintenance', label: 'Maintenance', category: 'aircraft', show: true, path: '/aircraft/maintenance', icon: 'engineering', class: '' },
  { id: 12, name: 'Maintenance Schedule', label: 'Maintenance Schedule', category: 'aircraft', show: true, path: '/aircraft/maintenance-schedule', icon: 'event_note', class: '' },

  { id: 13, name: 'Route', label: 'Route', category: 'commercial-planning', show: false, path: '/commercial-planning/route', icon: 'map', class: '' },
  { id: 14, name: 'Flight Schedule', label: 'Flight Schedule', category: 'commercial-planning', show: true, path: '/commercial-planning/flight-schedule', icon: 'schedule', class: '' },

  { id: 15, name: 'Crew', label: 'Crew', category: 'crew-planning', show: true, path: '/crew-planning/crew', icon: 'group', class: '' },
  { id: 16, name: 'Crew Aircraft', label: 'Crew Aircraft', category: 'crew-planning', show: true, path: '/crew-planning/crew-aircraft', icon: 'flight', class: '' },
  { id: 17, name: 'Crew Schedule', label: 'Crew Schedule', category: 'crew-planning', show: true, path: '/crew-planning/crew-schedule', icon: 'event_note', class: '' },

  { id: 18, name: 'Aircraft Schedule', label: 'Aircraft Schedule', category: 'flight-operation', show: true, path: '/flight-operation/aircraft-flight', icon: 'flight', class: '' },
  { id: 19, name: 'Todays Flight', label: 'Todays Flight', category: 'flight-operation', show: true, path: '/flight-operation/todays-flight', icon: 'today', class: '' },

  { id: 20, name: 'Report', label: 'Reports', category: 'reports', show: true, path: '/reports', icon: 'analytics', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router,
  ) {

    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      // You only receive NavigationEnd events
      // console.log(event)
      // console.log(event.url)
      let currentUrl = ((event.url == '/' ? event.urlAfterRedirects : event.url).replace('/', '').split('/'));
      // console.log(currentUrl)
      let urlCategory = currentUrl[0];
      // console.log(urlCategory)

      this.menuItems = ROUTES.filter(menuItem => menuItem.show != false && menuItem.category == urlCategory);
    });
    
  }

  ngOnInit() {

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
