const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({

  name: 'mfe-admin',

  exposes: {
    './Component': './src/app/app.component.ts',
    './Home': './src/app/pages/home/home.component.ts',
    './Parking': './src/app/pages/parking/pages/parking/parking.component.ts',
    './Rates': './src/app/pages/rates/pages/rates/rates.component.ts',
    './Vehicles': './src/app/pages/vehicles/pages/vehicle-list/vehicle-list.component.ts',
    './VehiclesDetail': './src/app/pages/vehicles/pages/vehicle-detail/vehicle-detail.component.ts',
    // './AdminList': './src/app/pages/vehicles/pages/admin/pages/admin-list/admin-list.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    '@angular/material': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ]

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

});
