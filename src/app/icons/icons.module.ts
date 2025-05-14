import { NgModule } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Alarm, App, Bookmark } from 'ng-bootstrap-icons/icons';
import { allIcons } from 'ng-bootstrap-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  Alarm,
  App,
  Bookmark
};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(allIcons) // Import all icons
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }

// NOTES:
// 1. We add BootstrapIconsModule to the 'exports', since the <bi> component will be used in templates of parent module
// 2. Don't forget to pick some icons using BootstrapIconsModule.pick({ ... })