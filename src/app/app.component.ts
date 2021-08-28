import { Component, ElementRef, OnInit, VERSION, ViewChild } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  // name = 'Angular ' + VERSION.major;
  @ViewChild('paypal') paypalElement: ElementRef;  
  paypal;
  payPalConfig? : IPayPalConfig;
  constructor() { }  
  planId: any;
  
  ngOnInit() {   
    this.initConfig();  
  }
  
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'INR',
        clientId: 'AUpRNsivEIiiPmE2uiGsYvWfq_t9-uVrB-vtvcAqFH8KFQvT9ARe3sKw-PWzuXFz9bMEeJvsa2WWlgRP',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'INR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'INR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'INR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        },
    };
}
}
