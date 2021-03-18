import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFiltering'
})
export class AppFilteringPipe implements PipeTransform {

  transform(items: any, [originalList, region, county, type]: any) {
    console.log(originalList)
    //Filter options:
    var overallResults = originalList;
    var filterByRegion = false;
    var filterByCounty = false;
    var filterByType = false;

    if (region !== "Filter by Region") filterByRegion = true;

    if (county !== "Filter by County") filterByCounty = true;

    if (type !== "Filter by Type") filterByType = true;

    if (filterByType) overallResults = overallResults.filter(item => item.type === type);

    if (filterByRegion) overallResults = overallResults.filter(item => item.region === region);

    if (filterByCounty) overallResults = overallResults.filter(item => item.county === county);

    return overallResults;
  }

}
