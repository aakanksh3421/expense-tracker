export const currencyFormatter = new Intl.NumberFormat(undefined,{
    currency: 'inr',
    style : "currency",
    minimumFractionDigits:0,
})

export   function currencyFormat(num) {
    return '₹' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
 
//  console.log(currencyFormat(2665)); // $2,665.00