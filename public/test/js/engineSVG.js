(function(w, doc){
    //全局挂载命名空间
    window.lsl = window.lsl || {};

    //svg局部空间的参数定义
    const SVG_CONFIG = {
        circleCenterX : 120,    //圆弧圆心横坐标
        circleCenterY : 130,    //圆弧圆心纵坐标
        radius : 104,           //圆弧半径
        strokeWidth : 4,        //圆弧线宽
        leftColor : '#00d765',   //左边圆弧的背景颜色
        rightColor : '#ff5151',   //右边圆弧的背景颜色
        transform : 'rotate(-270, 120, 130)'      //右边弧度逆时针绘制需要借助transform实现

    };

    /*
     *功能函数
     *根据角度和相关参数获取绘制的坐标   
    */
    function coorMap(x, y, R, a){
        var radin = (360 - a) * Math.PI / 180;

        var tx = R * Math.cos(radin);
        var ty = R * Math.sin(radin);
    
        return {
            x : x + tx,
            y : y - ty
        }
    }
    
    /*
    *功能函数
    *绘制svg中的path
    */
    function drawPath(data){
        var path = null;
        var s = coorMap(data.x, data.y, data.R, data.startAngle);
        var e = coorMap(data.x, data.y, data.R, data.endAngle);
    
        var tpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        var path = 'M' + s.x + ',' + s.y + 'A' + data.R + ',' + data.R + ',0,' + 
                (+(data.endAngle - data.startAngle > 180)) + ',' + (data.sweepFlag ? data.sweepFlag : 0)+ ',' + e.x + ',' + e.y;

        tpath.setAttribute('d', path);
        tpath.setAttribute('class', data.className || 'path-default');
        tpath.setAttribute('fill', 'none');
        tpath.setAttribute('stroke', data.color || '#ccc');
        tpath.setAttribute('stroke-width', data.strokeWidth || 2);

        data.strokelinecap && tpath.setAttribute('stroke-linecap', data.strokelinecap);
        data.strokeDasharray &&  tpath.setAttribute('stroke-dasharray', data.strokeDasharray);
        data.transform &&  tpath.setAttribute('transform', data.transform);

        return tpath;
    }
    

    //绘制svg，函数挂载到命名空间上
    lsl.drawSVG = function(selector, opts){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        svg.setAttribute("version","1.1");
        svg.setAttribute("width","240px");
        svg.setAttribute("height","240px");

        //左边弧度
        svg.appendChild(drawPath({
            startAngle : 135,
            endAngle : 225,
            x : SVG_CONFIG.circleCenterX,
            y : SVG_CONFIG.circleCenterY,
            R : SVG_CONFIG.radius,
            strokeWidth : SVG_CONFIG.strokeWidth,
            sweepFlag : 1         //左边的弧线是顺时针绘制
        }));

        svg.appendChild(drawPath({
            startAngle : 135,
            endAngle : 135 + Math.floor(90 * opts.left.data / 100),
            x : SVG_CONFIG.circleCenterX,
            y : SVG_CONFIG.circleCenterY,
            R : SVG_CONFIG.radius,
            strokeWidth : SVG_CONFIG.strokeWidth,
            color: SVG_CONFIG.leftColor,
            sweepFlag : 1,
            className : opts.left.className
        }));

        //右边弧度
        svg.appendChild(drawPath({
            startAngle : -45,
            endAngle : -135,
            x : SVG_CONFIG.circleCenterX,
            y : SVG_CONFIG.circleCenterY,
            R : SVG_CONFIG.radius,
            strokeWidth : SVG_CONFIG.strokeWidth,
            transform: SVG_CONFIG.transform
        }));

        svg.appendChild(drawPath({
            startAngle : -45,
            endAngle : -45 + Math.floor(-90 * opts.right.data / 100),
            x : SVG_CONFIG.circleCenterX,
            y : SVG_CONFIG.circleCenterY,
            R : SVG_CONFIG.radius,
            strokeWidth : SVG_CONFIG.strokeWidth,
            color : SVG_CONFIG.rightColor,
            className : opts.right.className,
            transform: SVG_CONFIG.transform
        }));

        document.querySelector(selector).appendChild(svg);
    }
    
    //重新设置给定svg对象中的具体path
    lsl.setSvgData = function(svg, sideClassName, data){
        let stopDeg = sideClassName == 'path-right' ?  -45 + Math.floor(-90 * data / 100) : 
                            135 + Math.floor(90 * data / 100);

        let replacePath = svg.querySelector('.' + sideClassName);
        svg.replaceChild(drawPath({
            startAngle: sideClassName == 'path-right' ? -45 : 135,
            endAngle: stopDeg,
            x: SVG_CONFIG.circleCenterX,
            y: SVG_CONFIG.circleCenterY,
            R: SVG_CONFIG.radius,
            strokeWidth: SVG_CONFIG.strokeWidth,
            color: sideClassName == 'path-right' ? SVG_CONFIG.rightColor : SVG_CONFIG.leftColor,
            transform: sideClassName == 'path-right' ? SVG_CONFIG.transform : '',
            sweepFlag : sideClassName == 'path-left' ? 1 : 0,
            className : sideClassName
        }), replacePath);
    }
})(window, document);