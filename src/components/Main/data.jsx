import uuid from 'react-uuid';

// color list
export const color = ['#A7958B', '#BFAD76', '#E7D3A7', '#F0B694', '#C2C2BB']

// paymentInfo(測試資料)
export const paymentInfo = [
    {
        account: 
        {
            id: uuid,
            name: "tina",
            color: "#BFAD76",
            payment: [
                {
                    price: 110,
                    item: 'MRT',
                    id: uuid
                },
                {
                    price: 120,
                    item: 'bus',
                    id: uuid
                },
                {
                    price: 130,
                    item: 'taxi',
                    id: uuid
                }
            ]
        }
    },
    {
        account: 
        {
            id: uuid,
            name: "barney",
            color: "#E7D3A7",
            payment: [
                {
                    price: 210,
                    item: 'breakfast',
                    id: uuid
                },
                {
                    price: 220,
                    item: 'lunch',
                    id: uuid
                },
                {
                    price: 230,
                    item: 'dinner',
                    id: uuid
                }
            ]
        }
    },
    {
        account: 
        {
            id: uuid,
            name: "luffy",
            color: "#C2C2BB",
            payment: [
                {
                    price: 310,
                    item: 'coffee',
                    id: uuid
                },
                {
                    price: 320,
                    item: 'dessert',
                    id: uuid
                }
            ]
        }
    }
]

// total price(測試資料)
export const totalPrice = paymentInfo.map((person) => person.account.payment.map((payment) => payment.price)).flat()