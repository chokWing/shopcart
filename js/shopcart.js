window.onload = function () {

    let itemWrapper = document.getElementById('item-list-wrapper');
    let itemLTD = document.getElementsByClassName('item-LTD'); //按商家获取
    let item = document.getElementsByClassName('list-item'); //单个商品
    let itemArr = Array.prototype.slice.call(itemLTD); //转化为数组
    let edit_a = document.getElementsByClassName('edit');  //小编辑按钮
    let totalQuantity = document.getElementsByClassName('totalQuantity')[0];  //计算按钮的数字
    let totalCount = document.getElementsByClassName('totalCount')[0]; //总价格
    let inputSelected = document.getElementsByClassName("check"); //所有checkbox

    //计算总价
    function getTotal() {
        let selected = 0;
        let price = 0;
        for (let i = 0; i < item.length; i++) {
            if (item[i].getElementsByTagName('input')[0].checked) {
                selected++;
                price += parseInt(item[i].querySelector('.now').innerText) * parseInt(item[i].querySelector('.quantity').innerText);
            }
        }
        totalQuantity.innerText = selected;
        totalCount.innerText = price.toFixed(2);
    }

    //checkbox选框全选以及计算效果
    for (let i = 0; i < inputSelected.length; i++) {
        inputSelected[i].onchange = function () {
            if (this.className.indexOf('checkLTD') > 0) {
                let checkLTD = this.parentNode.parentNode.getElementsByClassName('check');
                for (let j = 0; j < checkLTD.length; j++) {
                    checkLTD[j].checked = this.checked;
                }
            } else if (this.className.indexOf('checkAll') > 0) {
                for (let k = 0;k<inputSelected.length;k++) {
                    inputSelected[k].checked=this.checked;
                }
            }
            getTotal();
        }
    }
    //点击编辑事件
    for (let i = 0; i < itemLTD.length; i++) {
        edit_a[i].onclick = function (flag) {
            if (flag === event) {
                this.innerText = this.innerText === '编辑' ? '完成' : '编辑';
            } else {
                this.innerText = flag;
            }
            let pannel = itemArr[i].getElementsByClassName('info');
            if (this.innerText === '完成') {
                for (let j = 0; j < pannel.length; j++) {
                    pannel[j].style.display = 'none';
                    pannel[j].nextElementSibling.style.display = 'flex';
                }
            } else {
                for (let j = 0; j < pannel.length; j++) {
                    pannel[j].style.display = 'block';
                    pannel[j].nextElementSibling.style.display = 'none';
                }
            }
        }
    }
//顶部编辑
    let topEdit = document.getElementById('cart-top').getElementsByTagName('a')[0];
    topEdit.onclick = function () {
        this.innerText = this.innerText === '编辑' ? '完成' : '编辑';
        let flag = this.innerText;
        for (let i = 0; i < itemLTD.length; i++) {
            let edit_a = itemLTD[i].getElementsByClassName('edit')[0];
            edit_a.onclick(flag);
            if (this.innerText === '编辑') {
                edit_a.style.display = 'flex';
            } else {
                edit_a.style.display = 'none';
            }
        }
    }
    /*商品数量增减以及删除功能*/
    let info2 = document.getElementsByClassName('info2'); //获取所有的可编辑面板

    for (let i = 0; i < info2.length; i++) {
        let inputQuantity = info2[i].getElementsByClassName('num')[0];
        let quantity = document.getElementsByClassName('quantity')[i];
        inputQuantity.oninput = function () {   //不能为空或输入负值
            if (this.value < 1 || this.value === null) {
                this.value = 1;
            }
            quantity.innerText = this.value.toString();
        }

        info2[i].onclick = function (e) {
            let el = e.srcElement;
            let cls = el.className;
            let input = this.getElementsByTagName('input')[0];
            let item = this.parentNode.parentNode.parentNode;  //商品
            switch (cls) {
                case 'add':
                    input.value++;
                    break;
                case 'decrease':
                    if (input.value > 1) {
                        input.value--;
                    }
                    break;
                case 'del':
                    if (item.parentNode.childElementCount === 1) {
                        itemWrapper.removeChild(item.parentNode.parentNode);
                    }
                    item.parentNode.removeChild(item);
            }
            quantity.innerText = input.value.toString();
            getTotal();
        }
    }
}

