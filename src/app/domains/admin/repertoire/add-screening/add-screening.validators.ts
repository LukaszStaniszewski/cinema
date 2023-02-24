import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";

import { RepertuireApiService } from "../repertoire.api.service";

export class AddScreaningValidators {
  static isGivenTermFree(service: RepertuireApiService): AsyncValidatorFn {
    return (group: AbstractControl): Observable<ValidationErrors | null> => {
      const hour = group.get("hour")?.value;
      const cinemaRoom = group.get("cinemaRoom")?.value;
      const date = group.get("day")?.value as Date;
      const formatedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: "GMT",
      });
      return service.checkTermAvailability(formatedDate, cinemaRoom).pipe(
        map(response => {
          if (response) {
            if (response.includes(hour)) {
              return {
                takenHours: `Wybrana przez ciebie godzina jest zajęta, zajęte godziny w podanym dniu i sali to: ${response.toString()}`,
              };
            }
            service.setTakenTerms(response);
          }
          return null;
        }),
        catchError(() => of({ takenHours: "Wystąpił nieoczkiwany błąd, spróbuj ponownie" }))
      );
    };
  }
}
