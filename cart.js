let addtocart = document.getElementsByClassName('addtocart');
let removefromcart = document.getElementsByClassName('removefromcart');
let itemcount = document.getElementById('items-count');
let total = document.getElementById('total');
let isProductInCart = false;
let index = 0;
let items = [];
//console.log(addtocart);

// adding items to cart
for (let i=0; i<addtocart.length; i++)
{
    addtocart[i].addEventListener('click',function(e)
    {
        
            let item = 
            {
                id: i+1,
                name:e.target.parentElement.children[0].textContent,
                price:parseInt(e.target.parentElement.children[1].children[0].textContent,10),
                image: e.target.parentElement.parentElement.children[0],
                no: 1
            };
            if(JSON.parse(localStorage.getItem('items')) === null){
                items.push(item);
                localStorage.setItem("items",JSON.stringify(items));
                window.location.reload();
                
            }else{
                
                const localItems = JSON.parse(localStorage.getItem("items"));
                localItems.map(data=>{
                    if(item.id == data.id)
                    {
                        item.no = data.no + 1;
                        console.log(item);
                    }
                    else
                    {
                        items.push(data);
                    }
                   
                    });
                    items.push(item);
                    localStorage.setItem('items',JSON.stringify(items));
                    
                    window.location.reload();
        }

    });
}
// removing items from cart
    for (let i=0; i<removefromcart.length; i++)
{
    removefromcart[i].addEventListener('click',function(e)
    {

            let item = 
            {
                id: i+1,
                name:e.target.parentElement.children[0].textContent,
                price:e.target.parentElement.children[1].children[0].textContent,
                no: 1
            };
            if(localStorage.getItem('items') !== "[]")
            {
                const removeItems = JSON.parse(localStorage.getItem('items'));
                removeItems.map(data=>{
                    if(JSON.parse(localStorage.getItem('items')) !== null)
                    {
                        if(item.id == data.id && data.no > 1)
                        {
                            item.no = data.no - 1;
                            //console.log(item);
                            items.push(item);
                        }   
                        else if(item.id != data.id)
                        {
                            
                            items.push(data); 
                        }
                        
                        else 
                        {
                            alert (data.name + ' removed from cart')
                        }
                        
                        for(index=0;index<removeItems.length;index++) {
                            if (item.id == removeItems[index].id) {
                                isProductInCart = true
                                break
                            }
                        }
            
                        

                        localStorage.setItem('items',JSON.stringify(items));
                        window.location.reload();      
                  }
                  else
                  {
                      alert('cart is empty')
                  }
            
                  
                    });
                    if (isProductInCart == false) {
                        alert('Product not present in the cart!')
                    }
                }
                    
                else
                {
                    alert('cart is already empty');
                } 
            

    });
}
// adding count of total items

let total_count = 0;
let total_price = 0;
JSON.parse(localStorage.getItem('items')).map(data=>
    {
        total_count = total_count + data.no;
        total_price = total_price + (data.price*data.no);
    });
    itemcount.innerHTML = total_count;
    total.innerHTML ='Total amount $'+total_price;


// clearing data from cart

let clearcart=document.getElementById('clearcart');
clearcart.addEventListener('click',function(e)
{
    if(localStorage.getItem('items') !== "[]")
    {
        localStorage.setItem('items',"[]");
        window.location.reload();
    }
    else
    {
        alert('cart is already empty');
    }
    
    
}
);

// adding data in table

let carttable = document.getElementById('table');
let tableData = '';

tableData += '<tr><th>Product Number</th><th>Item Name</th><th>Item Count</th><th>Item Price</th><th>Total</th><th></th></tr>';
if(JSON.parse(localStorage.getItem('items')) === null)
{
    
}else
{
    JSON.parse(localStorage.getItem('items')).map(data=>{
        tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th>'+data.price*data.no+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
    });
    
    
}
//delete single item from cart
function Delete(e)
{
    JSON.parse(localStorage.getItem('items')).map(data=>{
        if(data.id != e.parentElement.parentElement.children[0].textContent){
            
            items.push(data);

        }
    });
    localStorage.setItem('items',JSON.stringify(items));
    window.location.reload();
};
carttable.innerHTML = tableData;

