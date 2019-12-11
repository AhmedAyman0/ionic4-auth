import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { NavController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { LoadingService } from '../Services/loading.service';
import { AlertService } from '../Services/alert.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-auth',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('.5s'  ,
                    style({ opacity: 1 , height:0 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({  opacity: 1 }),
            animate('1s',
                    style({ opacity: 0 , height:0 }))
          ]
        )
      ]
    )
  , ],
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  form: FormGroup;
  rform: FormGroup;
  submitted = false;
  register = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingServ: LoadingService,
    private alertServ: AlertService,
    private toast: Toast,
    private rolesService: RolesService
  ) {
    this.rform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['']
    });
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}
  actionChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    if (event.detail.value === 'register') {
      this.register = true;
    } else {
      this.register = false;
    }
  }
  onRegister() {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    } else {
      const newUser = this.form.value;
      newUser.email = newUser.email.toLowerCase();
      if (newUser.role) {
        newUser.role = this.rolesService.Roles.ShopOwner;
      } else {
        newUser.role = this.rolesService.Roles.Customer;
      }
      this.authService.register(newUser).subscribe(
        resp => {
          console.log('reg', resp);
          this.toast
            .show('Registeration Successfull!', '1500', 'top')
            .subscribe();
          this.authService
            .login(this.form.value)
            .subscribe(
              async resp => {
                const data = await resp;
                console.log(data);
                if (data.role == this.rolesService.Roles.Customer) {
                  // return this.navCtrl.setRoot(HomePage);
                  return this.navCtrl.navigateRoot('/customer/tabs/discover', {animationDirection: 'forward'});
                }
                if (data.role == this.rolesService.Roles.ShopOwner) {
                  // return this.navCtrl.setRoot(OwnerHomePage);
                }
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
          return;
        }
      );
    }
  }

  login() {
    this.loadingServ.presentLoading('Please Wait..');
    this.authService.login(this.form.value).subscribe(
      resp => {
        this.loadingServ.dismiss();
        console.log('sucess', resp);
        this.navCtrl.navigateRoot('/customer/tabs/discover', {
          animationDirection: 'forward'
        });
      },
      err => {
        this.loadingServ.dismiss();
        console.log(err);
        this.alertServ.presentErrorAlert(err.error.msg);
      }
    );
  }
}
