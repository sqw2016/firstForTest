require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
	
/*画廊背景构建，总管画廊数据和状态刷新*/
var picDatas = [{
	url : '../images/1.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/2.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/3.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/4.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/11.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/6.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/7.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/8.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/9.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/10.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/14.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/12.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}, {
	url : '../images/13.jpg',
	title : '七龙珠',
	desciption : '一部热血动画'
}];
var VIEWWIDTH = document.body.scrollWidth,//视口宽度
	VIEWHEIGHT = document.body.scrollHeight,//视口高度
	IMGWIDTH = 190,//图片宽度
	IMGHEIGHT = 290;//图片高度

/*画廊墙壁*/
class GalleryWall extends React.Component {
	/*初始化图片状态*/
	constructor() {
		super();
		
		this.state = {
			imgStateDatas : this.computeImgsState(0)
		};
	}
	/*
	*计算图片状态
	*
	*@params index:中心图片在数组中的位置
	*
	*return imgsState:图片状态数组
	*/
	computeImgsState(centerIndex) {
		var imgsState = picDatas;
		/*循环处理数组中的每个对象*/
		var upNum = 0,//上侧图片数量
			leftNum = 0,//左侧图片数量
			len = imgsState.length;//图片个数
		var me = this;
		imgsState.forEach(function(val, index){
			/*处理中心图片*/
			imgsState[index].index = index;
			if (index === centerIndex) {
				imgsState[index].rotate = 0;//旋转角度为0
				imgsState[index].left = (VIEWWIDTH-IMGWIDTH)/2;//视口一半减去图片一半
				imgsState[index].top = (VIEWHEIGHT-IMGHEIGHT)/2;//视口一半减去图片一半
				imgsState[index].isInverse = false;//图片是否翻转
				imgsState[index].isCenter = true;//是否是中心图片

			} else {//非中心图片处理，只放置一张图片
				if (!upNum && Math.random() > 0.5) {
					imgsState[index].rotate = me.getDesignatedRandom(-30, 30);//旋转角度为-30到30
					imgsState[index].left = me.getDesignatedRandom((VIEWWIDTH/2 - IMGWIDTH), (VIEWWIDTH/2 + IMGWIDTH));//中轴线左右各一张图片的距离
					imgsState[index].top = me.getDesignatedRandom(-IMGHEIGHT/2, (VIEWHEIGHT/2 - IMGHEIGHT));//负半张图片高度到距离中轴线一张图片
					imgsState[index].isInverse = false;//图片是否翻转
					imgsState[index].isCenter = false;//是否是中心图片
					upNum ++;
				} else if (leftNum < (len-2)/2 && Math.random() > 0.5) {/*左侧区域图片*/
					imgsState[index].rotate = me.getDesignatedRandom(-30, 30);//旋转角度为-30到30
					imgsState[index].left = me.getDesignatedRandom(-IMGWIDTH/2, (VIEWWIDTH/2 - 3*IMGWIDTH/2));//负半张图片宽度到距离中轴线一张图片的距离
					imgsState[index].top = me.getDesignatedRandom(-IMGHEIGHT/2, (VIEWHEIGHT - IMGHEIGHT));//负半张图片高度到距离底部半张图片高度
					imgsState[index].isInverse = false;//图片是否翻转
					imgsState[index].isCenter = false;//是否是中心图片
					leftNum ++;

				} else {//右侧图片
					imgsState[index].rotate = me.getDesignatedRandom(-30, 30);//旋转角度为-30到30
					imgsState[index].left = me.getDesignatedRandom((VIEWWIDTH/2 + IMGWIDTH), (VIEWWIDTH - 3*IMGWIDTH/2));//负半张图片宽度到距离中轴线一张图片的距离
					imgsState[index].top = me.getDesignatedRandom(-IMGHEIGHT/2, (VIEWHEIGHT - IMGHEIGHT));//负半张图片高度到距离底部半张图片高度
					imgsState[index].isInverse = false;//图片是否翻转
					imgsState[index].isCenter = false;//是否是中心图片
				}

			}

		});
		return imgsState;
	}
	/*取数值的随机数*/
	getDesignatedRandom(small, big) {
		return Math.floor(big - (big-small)*Math.random());
	}
	/*
	*图片点击执行函数
	*
	*@params index:当前图片在数组中的位置
	*
	*return 一个执行函数，利用闭包函数记录图片在数组中的位置
	*/
	clickPicture(index) {
		var _self = this;
		return function() {
			var imgsState = _self.state.imgStateDatas;
			/*判断点击的图片是否是中心图片，如果中心图片则翻转图片，否则将图片移动到中心图片位置*/
			if (imgsState[index].isCenter) {
				imgsState[index].isInverse = !imgsState[index].isInverse;
			} else {
				imgsState = _self.computeImgsState(index);
			}
			_self.setState({imgStateDatas : imgsState});
		}
	}
	render() {
		var imgArr = this.state.imgStateDatas;
		var me = this;
		var picComponents = [],
			controllerComponents = [];
		imgArr.forEach(function(obj, index){
			picComponents.push(<Picture key={index} data={obj} clickFun={me.clickPicture(index)} />);
			controllerComponents.push(<Controller key={index} data={obj} clickFun={me.clickPicture(index)} />);
		});
		return (
			<div className="galleryContain">
				{
					picComponents
				}
				<nav className="control-nav">
					<ul>
						{
							controllerComponents
						}
					</ul>
				</nav>
			</div>
		);
	}
}

/*画*/
class Picture extends React.Component{
	render() {
		var picFigClass = 'picFigure';
		this.props.data.isInverse ? (picFigClass += ' inverse') : (picFigClass);
		var figureStyle = {
			left : this.props.data.left,
			top	: this.props.data.top
		};
		if (this.props.data.rotate) {
			figureStyle.transform = 'rotate(' + this.props.data.rotate + 'deg)';
		}
		if (this.props.data.isCenter) {
			figureStyle.zIndex = 100;
		}
		return (
			<figure className={picFigClass} style={figureStyle} onClick={this.props.clickFun}>
				<img className="pictureClass" src={this.props.data.url} />
				<figcaption>
					<p>{this.props.data.title}</p>
					<section className="pictureDesc">
						<p>{this.props.data.desciption}</p>
					</section>
				</figcaption>
			</figure>
		);
	}
}

/*控制按钮*/
class Controller extends React.Component {
	render() {
		var styleObj = {};
		if (this.props.data.isCenter) {//中间图片的控制按钮放大2倍
			styleObj.transform = "scale(1.5)";
		}
		if (this.props.data.isInverse) {
			styleObj.background = "#101010";
			styleObj.transform += " rotateY(180deg)";
		}
		return(
			<li key={this.props.data.index} style={styleObj} onClick={this.props.clickFun} >{this.props.data.index+1}</li>
		);
	}
}
GalleryWall.defaultProps = {}

export default GalleryWall;
