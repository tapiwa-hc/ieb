import { AbstractControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmNewPassword');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}