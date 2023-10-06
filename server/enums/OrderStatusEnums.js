class OrderStatusEnums {
    constructor() { 
        const orderStatus = {
            PENDING: 0,
            APPROVED: 1,
            CANCELED: 2,
        }
        Object.freeze(orderStatus);

        this.PENDING = orderStatus.PENDING;
        this.APPROVED = orderStatus.APPROVED;
        this.CANCELED = orderStatus.CANCELED;

        this.orderStatusList = [
            { text: 'Pending', name:'pending', value: this.PENDING },
            { text: 'Approved', name:'approved', value: this.APPROVED },
            { text: 'Canceled', name:'canceled', value: this.CANCELED },
        ]
        this.orderStatusList = orderStatus;
    }
}

module.exports = OrderStatusEnums;