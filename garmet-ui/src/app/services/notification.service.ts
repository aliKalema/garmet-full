import {Injectable} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

export declare type NotificationConfig = {
  action?: string,
  duration?: number,
  horizontalPosition?: MatSnackBarHorizontalPosition,
  verticalPosition?: MatSnackBarVerticalPosition,
  notificationType?: NotificationType
};
export declare type NotificationType = 'warn' | 'success' | 'danger' ;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private duration: number =  5;
  private action: string = 'OK';
  private notificationType: NotificationType | undefined = undefined;
  constructor(private snackBar: MatSnackBar) { }

  public notify(message: string,
                notificationType?: NotificationType,
                action?: string,
                duration?: number,
                horizontalPosition?: MatSnackBarHorizontalPosition,
                verticalPosition?: MatSnackBarVerticalPosition): void{
    const config = this.validate(action, duration, notificationType, horizontalPosition, verticalPosition);
    //TODO style according to type
    this.snackBar.open(message,config.action,this.constructMatSnackBarConfig(config));
  }

  private validate(action?: string,
                   duration?: number,
                   notificationType?: NotificationType,
                   horizontalPosition?: MatSnackBarHorizontalPosition,
                   verticalPosition?: MatSnackBarVerticalPosition): NotificationConfig{
    let hp: MatSnackBarHorizontalPosition = this.horizontalPosition;
    let vp: MatSnackBarVerticalPosition =  this.verticalPosition;
    let ac: string =  this.action;
    let dur: number = this.duration;
    let nt: NotificationType | undefined = this.notificationType;
    if(horizontalPosition !== undefined)
      hp=horizontalPosition;

    if(verticalPosition !== undefined)
      vp = verticalPosition;

    if(action !== undefined)
      ac = action;

    if(duration !== undefined)
      dur = duration;

    if(notificationType !== undefined)
      nt = notificationType;

    return  {
              action: ac,
              duration: dur,
              notificationType: nt,
              horizontalPosition: hp,
              verticalPosition: vp
            };
  }

  private constructMatSnackBarConfig(notificationConfig: NotificationConfig): MatSnackBarConfig{
    let panelClass: string[] | undefined = undefined
    if(notificationConfig.notificationType == 'warn')
      panelClass = ['warn-snackbar']

    else if(notificationConfig.notificationType == 'success')
    panelClass = ['success-snackbar']

    else if(notificationConfig.notificationType == 'danger')
      panelClass = ['danger-snackbar']

    return {
      duration: (notificationConfig.duration! * 1000),
        horizontalPosition: notificationConfig.horizontalPosition,
      verticalPosition: notificationConfig.verticalPosition,
      panelClass: panelClass,
    }
  }

}
