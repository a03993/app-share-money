import uuid from 'react-uuid';

// color list
export const color = ['#A7958B', '#BFAD76', '#E7D3A7', '#F0B694', '#C2C2BB']

// 測試資料

// paymentData(Test) 假資料
export const paymentDataTest = [
        {
            id: uuid,
            name: "tina",
            color: "#BFAD76",
            payment: [
                {
                    price: 750,
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
        },
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
        },
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
        },
        {
            id: uuid,
            name: "miumiu",
            color: "#F0B694",
            payment: [
                {
                    price: 450,
                    item: 'candy',
                    id: uuid
                },
                {
                    price: 500,
                    item: 'bag',
                    id: uuid
                }
            ]
        }
]