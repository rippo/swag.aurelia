export class App {
  configureRouter(config, router) {
    config.title = 'Swagolicious';
    config.map([
      { route: ['','welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title:'Welcome' },
      { route: 'editswag',     name: 'Edit Swag',    moduleId: 'editswag',     nav: true,  title:'Edit Swag' },
      { route: 'carousel',     name: 'Carousel',    moduleId: 'carousel',     nav: true,  title:'Carousel' }
   ]);

    this.router = router;
  }
}