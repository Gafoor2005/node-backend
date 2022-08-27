

let items
async function getItems(){

    let getitems = await
     fetch('/items')
    .then((response) => response.json())
    .then((data) => {
        items = data;
        // console.log(data)
    });
    console.log(items.items);

    let len = items.items.length;
    let i = 0;

    while (i<len) {

        let item_no = items.items[i];
        
        let products = document.getElementsByClassName('products');
        
        let item_div = document.createElement('div');
        item_div.classList.add('item');
        products[0].appendChild(item_div);

        let imgbox_div = document.createElement('div');
        imgbox_div.classList.add('imgbox');
        item_div.appendChild(imgbox_div);

        let img_img = document.createElement('img');
        img_img.src = './uploads/'+ item_no.item_img;
        imgbox_div.appendChild(img_img);

        let h3_h3 = document.createElement('h3');
        h3_h3.innerText = item_no.item_name;
        item_div.appendChild(h3_h3);

        let p_p = document.createElement('p');
        p_p.innerText = '$ ' + item_no.item_price;
        item_div.appendChild(p_p);

        let itemlinks_div = document.createElement('div');
        itemlinks_div.classList.add('itemlinks');
        item_div.appendChild(itemlinks_div);

        let add_button = document.createElement('button');
        add_button.innerText = 'add to cart';
        itemlinks_div.appendChild(add_button);

        let buy_button = document.createElement('button');
        buy_button.innerText = 'buy';
        itemlinks_div.appendChild(buy_button);

    
        i++;
    }

    console.log(products[0]);
}
getItems()