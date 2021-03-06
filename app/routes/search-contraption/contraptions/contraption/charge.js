import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  chargeApi: service('charge-api'),
  beforeModel(){
    console.log('qui nascondere');
  },

  setupController: function(controller, model) {
    controller.set('isReturned',this.isReturned);
    controller.set('chargeQuantity', null);
    this._super(controller, model);
  },

  actions:{
    confirmCharge(){
      let qt = Number(this.get('controller').get('chargeQuantity'));
      if(qt > 0){

        let isReturned = this.get('controller').get('isReturned');
        this.chargeApi.send(this.currentModel.get('id'), qt, isReturned).then((resp) => {
          let availableQt = resp.data[0].attributes.availableQt;
          let order_status = resp.data[0].attributes.order_status;
          let borrowed_qt = resp.data[0].attributes.borrowed_qt;

          this.currentModel.set('availableQt', availableQt);
          this.currentModel.set('order_status', order_status);
          this.currentModel.set('borrowed_qt', borrowed_qt);


          // alert('ok');
          this.transitionTo('search-contraption.contraptions');
          this.send('showSuccessAlert')
          // this.transitionTo('search-contraption');
        },
          (error) =>{
            this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
          }
        )
      }
      else{
        this.send('showError', 'Qualcosa è andato storto. Controlla i dati e riprova');
      }
    }
  }
});
