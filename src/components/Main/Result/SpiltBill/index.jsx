import uuid from 'react-uuid';

export function SpiltBill({personalPaymentResult, paymentRendering}){
    for(let i = 0; i < personalPaymentResult.debtor.length; i++){
        for(let j = 0; j < personalPaymentResult.creditor.length; j++){
            // 當有欠款的時候才會開始比對
            if(personalPaymentResult.debtor[i].result < 0){
                // 欠款 < 還款 -> 不需要再比對
                if(personalPaymentResult.debtor[i].result + personalPaymentResult.creditor[j].result > 0){
                    paymentRendering[i].toPay.push({
                        id: uuid(),
                        name: personalPaymentResult.creditor[j].name,
                        color: personalPaymentResult.creditor[j].color,
                        price: Math.abs(personalPaymentResult.debtor[i].result),
                    })
                    personalPaymentResult.creditor[j].result += personalPaymentResult.debtor[i].result
                    personalPaymentResult.debtor[i].result = 0
                    break
                }
                // 欠款 > 還款 -> 需要再比對
                if(personalPaymentResult.debtor[i].result + personalPaymentResult.creditor[j].result < 0){
                    paymentRendering[i].toPay.push({
                        id: uuid(),
                        name: personalPaymentResult.creditor[j].name,
                        color: personalPaymentResult.creditor[j].color,
                        price: Math.abs(personalPaymentResult.creditor[j].result),
                    })
                }
            }     
        }
    }
}