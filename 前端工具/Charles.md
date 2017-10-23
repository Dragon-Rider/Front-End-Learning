---
layout: default
title: {{ site.name }}
---

# Mac抓包工具Charles

过去在Windows系统下开发时，一直使用Fiddle进行抓包。现在换Mac后逐渐使用Charles抓包，首先从Charles官网[下载地址](https://www.charlesproxy.com/download/)下载安装。

这里简单介绍几种Charles的调试技巧:
## 一、用本地文件替换线上文件
### 1、替换beta上文件（51ping）
***
1.1、首先需要Chrome安装SwitchySharp插件并配置Charles代理，这样Chrome下的链接才会走Charles发送。
<div align="center">
    <img width="70%" src="../img/前端工具/Charles1.png"/>
    <p style="color: grey">图1.1.1 SwitchySharp插件配置</p>
    <img src="../img/前端工具/Charles1.2.png"/>
    <p style="color: grey">图1.1.2 记得要切换到Charlse链接</p>
</div>

1.2、打开Charles，选择Tools —> No caching Seting，勾选Enable No Caching，确保不用缓存文件。

<div align="center">
    <img width="70%" src="../img/前端工具/Charles3.png"/>
    <p style="color: grey">图1.2.1 Chrome不启用缓存设置</p>
</div>

另外，Chrome的Network设置里最好也勾选Disable Cache选项。如图1.2.2所示，这样可以在浏览器调试阶段也不启用缓存，防止修改了代码，但因为浏览器缓存未生效。

<div align="center">
    <img width="70%" src="../img/前端工具/Charles2.png"/>
    <p style="color: grey">图1.2.2 Charles不启用缓存设置</p>
</div>

1.3、单个文件的替换。选择Tools —> Map Local Settings 将线上文件映射到本地文件, 点击选择要替换的文件(例如：mm-order-list.*.js)。注意protocal可以置空，这样就可以匹配https和http等多种协议。  
`注意：webpack打包的项目可能还需要根据实际情况映射manifest.*.js和common.*.js才可以完成替换。`
<div align="center">
    <img width="80%" src="../img/前端工具/Charles5.png"/>
    <p style="color: grey">图1.3.1 Charles替换单个文件配置</p>
</div>

1.4、 文件夹整体替换。有了步骤1.3，我们已经可以进行单文件替换了，但分别设置太琐碎了。所以可以直接对整个文件夹进行替换，一劳永逸。以配置app-menuorder-h5的项目为例，Host和Local Path配置如图5所示:
<div align="center">
    <img width="70%" src="../img/前端工具/Charles6.png"/>
    <p style="color: grey">图1.4.1 Charles替换整个文件夹配置</p>
</div>

配置完成Map Local Settings后，还需要配置Rewrite选项，通过正则表达式来替换所有文件，如图1.4.2所示：

<div align="center">
    <img width="70%" src="../img/前端工具/Charles1.4.2.png"/>
    <p style="color: grey">图1.4.2 Charles Rewrite选项配置</p>
</div>

1.5 最后，刷新浏览器，如果Http的Respone Header里有X-Charles-Map-Local字段则代表本地文件替换成功。如图1.5.1所示：  
   `注意：如果是https链接，需要配置Charles支持对应域名的https协议才可以生效(没明白)`
<div align="center">
    <img width="70%" src="../img/前端工具/Charles8.png"/>
    <p style="color: grey">图1.5.1 文件替换成功效果图</p>
</div>

### 2、替换生产环境的文件（m.dianping.com）
用本地文件替换生产环境的文件同样需要设置 Map Local Settings 和 Rewrite Settings 两项。     

2.1 设置 Map Local Settings 进行文件目录映射，同图1.4.1，只需要把Host改成静态文件存储的域名即可，本例Host为：“www.dpfile.com”

2.2 设置 Rewrite Settings，这里需要分成两步：  
第一步，指定替换文件，注意线上的文件因为被压缩过，所以文件名中会有 “min” 字段。如图2.2.1所示：  
<div align="center">
    <img width="70%" src="../img/前端工具/Charles2.2.1.png"/>
    <p style="color: grey">图2.2.1 设置Map Local Settings 文件替换目录</p>
</div>

第二步，由于 "m.dianping.com" 引用映射后的 "www.dpfile.com" 域下的文件导致跨域问题（如图2.2.2所示）（为啥??）。
<div align="center">
    <img width="70%" src="../img/前端工具/Charles2.2.2.png"/>
    <p style="color: grey">图2.2.2 线上环境产生的跨域问题</p>
</div>
**所以需要对dpfile.com域下的Response Header添加字段**，允许跨域：Access-Control-Allow-Credentials: true 和 Access-Control-Allow-Origin: *，从而允许dpfile.com域下的文件被引用，如图2.2.3所示：

<div align="center">
    <img width="70%" src="../img/前端工具/Charles2.2.3.png"/>
    <p style="color: grey">图2.2.3 通过给Response Header添加字段，允许dpfile域下文件被引用</p>
</div>

按以上配置设置完毕后，即可用本地文件替换生产环境线上文件：）

## 二、用Charles抓手机的包
### 2. 使用Charles抓http的包
***
2.1 使用Charles调试过程，打开Charles后，Help的Local IP Address 可以看到本机的IP地址。在iPhone上的wifi手动设置服务器地址为mac的ip地址，端口号为8888. 然后在Charles的工具栏上打开Recording按钮，在用手机访问页面即可以抓包。

### 3. 使用Charles抓包https协议下的请求
***

```
这一部分会详细写完移上去的
ios安装charles:http://www.jianshu.com/p/235bc6c3ca77

日常使用：https://jingyan.baidu.com/article/cbf0e5009a5e292eab289364.html
安卓安装charles:Charles https抓包 — Android（这里需要拿到美团谢敏的授权）
ios安装后unknown解决(抓https的包的问题)：https://segmentfault.com/q/1010000009188854
```

## 三、其他
Charles只看特定域下的请求

#### 参考文档：  
+ [前端开发调试工具Charles使用](https://jingyan.baidu.com/article/cbf0e5009a5e292eab289364.html)  
+ [使用代理软件Charles替换远程文件进行本地调试](http://www.wlo-o.com/archives/363/)
+ （Charles 电脑证书和手机证书的原理补充一下, 因为会不停弹出被监控，所以补充下如何删除证书）[Charles https抓包 — Android](https://wiki.sankuai.com/pages/viewpage.action?pageId=664420154)
