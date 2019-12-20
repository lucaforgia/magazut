import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  ajax: service('ajax'),
  send(modelId, qt, op){
    return this.ajax.makeGet(config.apiHostName + "/discharge", {id:modelId, qt:qt, op: op}, "PUT");
  }
});
