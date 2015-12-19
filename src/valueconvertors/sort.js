export class SortValueConverter {
  toView(array, config) {

      return array
        .slice(0)
        .sort((a, b) => {
          if ((config.direction || 'ascending') === 'ascending') {
            return a[config.propertyName].localeCompare(b[config.propertyName])
          }
          return b[config.propertyName].localeCompare(a[config.propertyName])
        });
    }
}