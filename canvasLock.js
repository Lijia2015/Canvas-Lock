function DrawPan(){
	
	 /**********定义实例对象*******/
	
	 //获取时钟画布
	 this.clock = document.querySelector('#canvasLock');
	 
	 //定义画布的尺寸
	 this.size = 300;
	 
	 //获取画笔工具
	 this.ctx = this.clock.getContext('2d');
	 
	 //定义圆周率
	 this.pi = Math.PI;
	 
	 this.init();
}

//定义原型属性
DrawPan.prototype = {
	
	//输出执行
	init:function(){
		
		//定义画布的尺寸
		this.clock.width = this.size;
		this.clock.height = this.size;
		
		//先执行输出一次，不然会出现闪屏
		this.drawCircle();
		this.drawText();
		this.drawDeg();
		this.drawSP();
		this.drawMP();
		this.drawHP();
		
		setInterval(function(){
			this.ctx.clearRect(0,0,this.size,this.size);
			//执行输出
			this.drawCircle();
			this.drawText();
			this.drawDeg();
			this.drawSP();
			this.drawMP();
			this.drawHP();
			
		}.bind(this),1000)
		
		
	},
	
	//画表盘
	drawCircle:function(){
		
		this.draw(function(){
			//绘制表盘
			this.ctx.arc(this.size/2,this.size/2,this.size/2,0,this.pi*2);
			//将表盘填充到画布中
			this.ctx.fill();
		}.bind(this))
	},
	
	//画刻度
	drawDeg:function(){
		
		var w = 0;
		
		for(var i = 0; i<60; i++){
			
			w = i%5==0?20:10;
			
			this.draw(function(){
				
				//改变中心点，画刻度
				this.ctx.translate(this.size/2,this.size/2);
				this.ctx.rotate(i*this.pi/30);
				
				//两点画线
				this.ctx.moveTo(this.size/2-w,0);
			
				this.ctx.lineTo(this.size/2-5,0);
				
				this.ctx.strokeStyle = 'white';
				this.ctx.stroke();
				
			}.bind(this))
			
		}
	},
	
	//画秒针
	drawSP:function(){
		
		this.draw(function(){
			
			let s = new Date().getSeconds();
			
			//改变中心点，画刻度
			this.ctx.translate(this.size/2,this.size/2);
			
			this.ctx.rotate(s*this.pi/30-this.pi/2);
			
			//两点画线
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(this.size/2-25,0);
				
			this.ctx.strokeStyle = 'red';
			this.ctx.stroke();
			
		}.bind(this))
	},
	
	//画分针
	drawMP:function(){
		
		this.draw(function(){
			
			let s = new Date().getSeconds();
			let m = new Date().getMinutes();
			
			//改变中心点，画刻度
			this.ctx.translate(this.size/2,this.size/2);
			
			this.ctx.rotate((m+s/60)*this.pi/30-this.pi/2);
			
			//两点画线
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(this.size/2-40,0);
				
			this.ctx.strokeStyle = 'white';
			this.ctx.stroke();
			
		}.bind(this))
	},
	
	//画时针
	drawHP:function(){
		
		this.draw(function(){
			
			let h = new Date().getHours();
			let m = new Date().getMinutes();
			
			//改变中心点，画刻度
			this.ctx.translate(this.size/2,this.size/2);
			
			this.ctx.rotate((h+m/60)*this.pi/6-this.pi/2);
			
			//两点画线
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(this.size/2-80,0);
				
			this.ctx.strokeStyle = 'white';
			this.ctx.stroke();
			
		}.bind(this))
	},
	//显示数字
	drawText:function(){
		
		
		for(var i = 1; i<=12; i++){
			
			this.draw(function(){
				
				this.ctx.translate(this.size/2,this.size/2);
				
				var x = Math.cos((i-3)*(this.pi/6))*(this.size/2-35);
				var y = Math.sin((i-3)*(this.pi/6))*(this.size/2-35);
				
				this.ctx.font = "14px normal 楷体_gb2312";
				
				this.ctx.fillStyle = 'white';
				
				this.ctx.textBaseline = 'middle';
				
				this.ctx.textAlign = 'center';
				
				this.ctx.fillText(i,x,y);
				
			}.bind(this))
			
		}
		
		
		
	},
	
	draw:function(cb){
		
		this.ctx.save();
		this.ctx.beginPath();
		cb();
		this.ctx.closePath();
		this.ctx.restore();
	}
	
	
}
