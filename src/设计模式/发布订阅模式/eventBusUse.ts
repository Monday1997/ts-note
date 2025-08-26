import Event from './eventBus';
const eventBus = new Event();

const createEventlistening = (key: string, callback: (order_id: string) => void) =>
  eventBus.listen(key, (order_id:string) => {
    callback && callback(order_id);
  });

const EVENT_MAP = {
  SHOW_DELIVERY_STORE: 'showDeliveryStore',
};

const listeningDeliveryStoreModal = (callback: (order_id: string) => void) =>
  createEventlistening(EVENT_MAP.SHOW_DELIVERY_STORE, callback);
const showDeliveryStoreModal = (order_id: string) => eventBus.trigger(EVENT_MAP.SHOW_DELIVERY_STORE, order_id);

export {
  showDeliveryStoreModal,
  listeningDeliveryStoreModal,
};
