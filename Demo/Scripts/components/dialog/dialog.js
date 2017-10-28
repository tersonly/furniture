'use strict'

class Dialog {

    //构造函数和原型
    constructor()
    {
        const self = this
        const customHeap = document.createElement('div')
        customHeap.id = 'd-heap'
        customHeap.style.display = 'none'
        document.body.appendChild(customHeap)
        this.heap = customHeap
        this.c = () => {
            this.close();
        }
        this.cc = () => {
            this.closeCustom();
        }
        //绑定关闭事件
        document.querySelector('.dialog-close').addEventListener('click', this.cc);
        this.timer = null;
        this.timerMK = null;
        this.icon = {
            success(color) {
                return `<path fill="${color ? color : '#fff'}" d="M111 143c5,-3 15,-15 20,-20l40 -40c12,-12 16,-6 25,2 7,7 16,14 5,25 -16,14 -43,43 -59,59 -30,29 -28,33 -45,17 -13,-14 -26,-26 -39,-40 -19,-19 -16,-18 0,-34 12,-12 14,-8 23,2l30 29zm-104 -1c2,17 7,32 15,44 6,10 11,18 20,25 8,8 14,14 25,20 7,3 13,6 21,9 17,6 34,7 53,5 61,-7 112,-65 104,-134 -8,-62 -64,-112 -135,-104 -61,7 -113,64 -103,135z"/>`
            },
            error(color) {
                return `<path fill="${color ? color : 'red'}" d="M123 97c4,-2 18,-18 22,-22 13,-13 17,-9 28,2 11,11 13,14 1,26 -7,8 -15,15 -22,22 7,7 14,15 21,22 12,12 12,15 0,26 -10,11 -14,16 -27,3 -7,-7 -16,-15 -22,-22 -3,2 -19,18 -22,22 -13,13 -16,9 -27,-2 -11,-11 -14,-14 -2,-27 8,-7 15,-15 22,-22 -3,-4 -16,-16 -21,-21 -12,-12 -12,-15 0,-27 11,-10 14,-16 27,-2 6,6 18,15 22,22zm-116 44c3,23 13,45 27,61 9,11 20,20 32,26 7,4 13,7 21,9 17,6 33,7 52,5 27,-3 47,-14 65,-31 28,-25 41,-62 37,-101 -8,-60 -63,-110 -133,-101 -59,7 -111,63 -101,132z"/>`
            },
            warn(color) {
                return `<path fill="${color ? color : 'khaki'}" d="M143 165c5,5 3,14 3,20 0,23 3,21 -32,20 -12,0 -9,-10 -9,-20 0,-10 -3,-20 9,-20 6,0 23,-1 29,0zm-37 -16c-2,-8 -2,-77 -3,-95 0,-6 0,-9 7,-9 5,0 11,0 16,0 22,0 22,-2 22,11 -1,14 -2,89 -4,92 -5,4 -31,3 -38,1zm-99 -8c8,66 68,110 134,103 66,-8 112,-70 104,-135 -9,-65 -69,-111 -135,-103 -66,8 -112,69 -103,135z"/>`
            },
            confirm(color) {
                return `<path fill="${color ? color : 'khaki'}" d="M107 166c5,-1 32,-2 36,0 1,0 2,-1 3,7 0,8 0,26 -2,31 -6,2 -31,2 -37,0 -3,-6 -2,-32 0,-38zm-37 -83c-1,-13 33,-47 74,-36 29,8 53,39 36,68 -5,8 -11,13 -20,18 -4,2 -7,5 -11,8 -1,2 -2,4 -3,6 0,1 -1,4 -1,4 -1,3 0,1 -2,3 -3,2 -26,1 -31,1 -13,-1 -5,-24 4,-33 2,-2 7,-6 10,-8 6,-4 16,-7 18,-14 6,-15 -19,-28 -37,-10l-7 9c-4,5 -8,1 -12,-1 -5,-5 -14,-11 -18,-15zm-63 58c3,26 16,52 35,69 28,27 59,38 99,34 61,-7 112,-65 104,-134 -8,-62 -65,-112 -135,-104 -61,7 -113,64 -103,135z"/>`
            },
        }

        this.template = {
            tip(...opt) {
                return `<div  id="d-tip" style="width:300px;height:70px;background-color:rgba(0,0,0,.7);color:#fff;position:fixed;left:50%;top:50%;margin-left:-150px;margin-top:-35px;display:flex;justify-content:center;align-items:center;z-index:100">
                            <svg  width: "35px" viewBox="0 0  250 250">
                            <g>
                              ${opt[0]?self.icon.success(opt[1]): self.icon.error(opt[1])}
                              </g>
                            </svg>
                            <span>${opt[2]}</span>
                            <div>`
            },
            normal(...opt) {
                return `<div id="d-bg" style="position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(99,99,99,.5);display:flex;justify-content:center;align-items:center;z-index:99">
                              <section id="d-normal" style="width:400px;border-radius:3px;overflow:hidden;box-shadow:1px 1px 5px rgba(99,99,99,.4);background-color:#fff;">
                                <header style="background-color:#eee;display:flex;justify-content:space-between;align-items:center;height:35px;padding:5px 15px;">
                                  <span>${opt[0]}</span>
                                  <svg id="d-btn-close" width="20" viewBox="0 0 250 250">
                                    <g>
                                      <path fill="#666" d="M36 63l29 -28c4,-4 10,-4 14,0l49 49 49 -50c4,-3 11,-3 15,0l28 29c4,4 4,10 0,14l-50 49 51 51c4,4 4,10 0,14l-28 29c-4,3 -11,3 -14,0l-51 -51 -50 50c-4,4 -11,4 -14,0l-29 -28c-4,-4 -4,-11 0,-14l50 -51 -49 -49c-4,-3 -4,-10 0,-14z"/>
                                    </g>
                                  </svg>
                                </header>
                                <div style="display:flex;padding:10px;">
                                  <div>
                                    <svg width="50" viewBox="0 0 250 250">
                                      <g>
                                        ${(opt[1] === 'error' && self.icon.error(opt[2])) || (opt[1] === 'warn' && self.icon.warn(opt[2])) || (opt[1] === 'confirm' && self.icon.confirm(opt[2]))}
                                      </g>
                                    </svg>
                                  </div>
                                  <div style="margin:0 10px;">
                                    <p>${opt[3]}</p>
                                    <p style="font-size:14px;color:gray;">${opt[4]}</p>
                                  </div>
                                </div>
                                <footer style="display:flex;justify-content:flex-end;padding:0 20px 20px;">
                                  <button id="d-btn-ok" style="margin:0 10px;color:#fff;background-color:#73b352;border-radius:3px;border:none;width:55px;height:30px;">确定</button>
                                  ${opt[5] ? '<button id="d-btn-cancel" style="background-color:#eee;border-radius:3px;border:none;width:55px;height:30px;">取消</button>' : ''}
                                </footer>
                              </section>
                             </div>`
                           },
                       }
    }

    //静态方法
    //带默认值的参数（提示）
    tip(txt='操作成功',{type=true,color='white'}={}) {
        const tp=this.template.tip(type,color,txt);
        const  isExisted =document.getElementById('d-tip');
        if(isExisted!=null)
        {
            isExisted.outerHTML=tp;
        }else{
            document.body.insertAdjacentHTML('beforeEnd',tp);
        }
        //提示框的停留时间
        const wd =document.getElementById('d-tip');
        wd.classList.add('animated','fadeIn');
        clearTimeout(this.timer);
        this.timer= setTimeout(()=>{
            wd.classList.remove('animated','fadeIn')
            wd.classList.add('hide')
        },2000)
    }

     //设置文档
        setDom(html)
        {
            const isExisted =document.getElementById('d-bg')
            if(isExisted!==null)
            {
                isExisted.outerHTML=html;
                isExisted.classList.remove('hide')
            }else{
               document.body.insertAdjacentHTML('beforeEnd',html)
            }
        }


      //弹窗 需要点击确定
        alert(txt='请选择其它的操作',{header="提示",type='warn',title='此操作不可行',color='red'}={}){
            const self =this;
            const  tp =this.template.normal(header,type,color,title,txt,true);
            this.setDom(tp);
            const wd = document.getElementById('d-normal')
            wd.classList.add('animated','zoomIn')
            const close=()=>{
                wd.classList.remove('animated','zoomIn');
                self.close();
            }
            //返回一个promise对象
            return  new  Promise(resolve=>{
                document.getElementById('d-btn-ok').addEventListener('click',()=>{
                    close();
                    resolve(true)
                })
                document.getElementById('d-btn-cancel').addEventListener('click',()=>{
                    close();
                    resolve(false)
                })
                document.getElementById('d-btn-close').addEventListener('click',()=>{
                    close()
                    resolve(false)
                })
            })
        }
        

        custom(selector,allowClose = true){
            const isExisted = document.getElementById('d-bg-custom')
            const  node =document.querySelector(selector);
            node.classList.remove('hide')
            //停止冒泡
            node.addEventListener('click',e=>{
                e.stopPropagation()})
            if(isExisted!==null)
            {
                isExisted.innerHTML='';
                isExisted.appendChild(node)
                isExisted.classList.remove('hide')
            }else{
                document.body.insertAdjacentHTML('beforeEnd','<div id="d-bg-custom" style="position:fixed;width:100%;height:100%;left:0;top:0;background-color:rgba(99,99,99,.5);display:flex;justify-content:center;align-items:center;z-index=9;"></div>')
                const bg= document.getElementById('d-bg-custom')
                bg.appendChild(node)
            }

            if(allowClose===true)
            {
                document.getElementById('d-bg-custom').addEventListener('click',this.cc)
            }else{
                document.getElementById('d-bg-custom').removeEventListener('click',this.cc)
            }
            node.classList.add('animated','fadeInDown')
        }

        //显示上面的进度条
        showMask()
        {
            const isExisted =document.getElementById('d-mask');
            if(isExisted!==null)
            {
                isExisted.classList.remove('hide')
            }else{
              document.body.insertAdjacentHTML('beforeEnd','<div id="d-mask" style="position:fixed;width:100vh;height:100vh;left:0;top:0;background-color:rgba(255,255,255,.2);cursor:no-drop;z-index:99999"><div style="height:5px;width:100vw"><p style="height:5px;background-color:#42b6cf;box-shadow:0 0 10px 1px #fff;border-radius: 0 5px 5px 0 ;transition:all .3s; width:0 "></p></div></div>')
            }
            let width=0;
            this.mask= docment.getElementById('d-mask')
            this.bar=this.mask.querySelector('p')
            clearInterval(this.timerMK)
            this.timerMK=setInterval(()=>{
                if(width+20>100){
                    clearInterval(this.timerMK)
                }
                this.bar.style=`${width+=Math.random()*10}vw`

            },500)
        }

        //隐藏进度条
        hideMask()
        {
            this.bar.style.width='100vw'
            clearInterval(this.timerMK)
            this.timerMK=setTimeout(()=>{
                this.mask.classList.add('hide')
                this.bar,style.width='0'
            },500)
        }

        //关闭窗口
        close()
        {
            const bg = document.getElementById('b-dg')
            bg.classList.add('animated','fadeOut')
            setTimeout(()=>{
                bg.classList.add('hide')
                bg.classList.remove('animated','fadeOut')
            },500)
            return this
        }

        //关闭复杂的窗口
        closeCustom()
        {
            const bg = document.getElementById('d-bg-custom')
            Array.from(bg.children).forEach(i=>{
              this.heap.appendChild(i)
            })
            bg.classList.add('animated','fadeOut')
            setTimeout(()=>{
                bg.classList.add('hide')
                bg.classList.remove('animated','fadeOut')
            },500)
            return  this
        }
    }
    window.dialog=new Dialog()
