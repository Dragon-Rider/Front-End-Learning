---
layout: default
title: {{ site.name }}
---

# Mac抓包工具Charles

过去在Windows系统下开发时，一直使用Fiddle进行抓包。现在换Mac后逐渐使用Charles抓包，首先从Charles官网[下载地址](https://www.charlesproxy.com/download/)下载安装。

这里简单介绍几种Charles的调试技巧:
###1. 用本地文件替换线上文件
***
1.1 首先需要Chrome安装SwitchySharp插件并配置Charles代理，这样Chrome下的链接才会走Charles发送。
<div align="center">
    <img width="70%" src="../img/前端工具/Charles1.png"/>
    <p style="color: grey">图1 SwitchySharp插件配置</p>
</div>

1.2 之后打开Charles，选择Tools-No caching Seting，确保不用缓存文件。

<div align="center">
    <img width="70%" src="../img/前端工具/Charles3.png"/>
    <p style="color: grey">图2 Chrome不启用缓存设置</p>
</div>

另外，Chrome的Network设置里最好也勾选Disable Cache选项。如图3所示，这样可以在浏览器调试阶段也不启用缓存，防止修改了代码，但因为浏览器缓存未生效。

<div align="center">
    <img width="70%" src="../img/前端工具/Charles2.png"/>
    <p style="color: grey">图3 Charles不启用缓存设置</p>
</div>

1.3 单个文件的替换。选择Tools——Map local将线上文件映射到本地文件, 点击选择要替换的文件(例如：mm-order-list.*.js)。注意protocal可以选择为空，这样就可以匹配https和http两种。  
`注意：webpack打包的项目可能还需要根据实际情况映射manifest.*.js和common.*.js才可以完成替换。`
<div align="center">
    <img width="70%" src="../img/前端工具/Charles5.png"/>
    <p style="color: grey">图4 Charles替换单个文件配置</p>
</div>

1.4 文件夹整体替换。有了第三步骤，我们已经可以进行单个文件的替换了，但是一个个设置实在太麻烦了，这里可以直接对整个文件夹进行替换，一劳永逸，告别做一个需求加一个配置的情况。  
已配置app-menuorder-h5的项目为例，Host和Local Path配置如图5所示:
<div align="center">
    <img width="70%" src="../img/前端工具/Charles6.png"/>
    <p style="color: grey">图5 Charles替换整个文件夹配置</p>
</div>

需要注意的是，如果选择直接替换整个文件夹，则Tools还需选择Rewrite选项，如图6所示

<div align="center">
    <img width="70%" src="../img/前端工具/Charles7.png"/>
    <p style="color: grey">图6 Charles Rewrite选项配置</p>
</div>

1.5 最后，刷新浏览器，如果Http的Respone Header里有X-Charles-Map-Local字段则代表本地文件替换成功。如图7所示：  
   `注意：如果是https链接，需要配置Charles支持对应域名的https协议才可以生效`
<div align="center">
    <img width="70%" src="../img/前端工具/Charles8.png"/>
    <p style="color: grey">图7 文件替换成功效果图</p>
</div>

###2. 使用Charles抓手机的包
***
2.1 使用Charles调试过程，打开Charles后，Help的Local IP Address 可以看到本机的IP地址。在iPhone上的wifi手动设置服务器地址为mac的ip地址，端口号为8888. 然后在Charles的工具栏上打开Recording按钮，在用手机访问页面即可以抓包。

###3. 使用Charles抓包https协议下的请求
***



#### 参考文档：  
+ [前端开发调试工具Charles使用](https://jingyan.baidu.com/article/cbf0e5009a5e292eab289364.html)  
+ [使用代理软件Charles替换远程文件进行本地调试](http://www.wlo-o.com/archives/363/)
