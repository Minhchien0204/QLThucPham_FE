import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {
  count = 0;
  constructor(private spinner: NgxSpinnerService) { }

  handleError(error: HttpErrorResponse) {
    // this.logger.error(error);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    this.spinner.show();
    this.count++;
    const newReq = req.clone({
      // headers: req.headers.set('Authorization', environment.session),
    });
    return next.handle(newReq).pipe(
      catchError(
        this.handleError
      ), finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.spinner.hide();  
        }
      }
      ));
  }

}
