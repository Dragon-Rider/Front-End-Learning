<h1>Web调试工具Charles使用心得</h1>

## 目录
+ [一、安装与使用](#一安装与使用)
+ [二、抓手机的请求包](#二抓手机的请求包)
    - [http请求抓包](#http请求抓包)
    - [https请求抓包](#https请求抓包)
        - [iPhone手机抓https包](#iphone手机抓https包)
        - [安卓（小米）手机抓https包](#安卓小米手机抓https包)
+ [三、用本地文件替换线上文件](#三用本地文件替换线上文件)
    - [替换beta上文件](#替换beta上文件)
    - [替换生产环境的文件（跨域）](#替换生产环境的文件跨域)
+ [四、其他](#四其他)
    - [筛选指定域下的请求](#筛选指定域下的请求)
+ [参考文档](#参考文档)

Charles 是一个网络代理工具，经常用来进行Mac下的Web调试，功能类似于Windows环境下的Fiddler工具。因为工作中经常会用到，所以决定写一篇总结文章。

**注意，这一篇文章主要用来记录在使用过程中遇到的疑难问题和解决办法。常规的Charles安装与使用方法请查阅文末的[参考文档](#参考文档)，本文不再详述。**

## 一、安装与使用
从Charles [官网下载](https://www.charlesproxy.com/download/) 并安装软件包。

基本的使用方法本文就不作介绍了，如果不清楚的话，请移步这篇[文章](http://blog.csdn.net/guoguo527/article/details/52287837)，写的十分详细。

下面具体分析在使用中遇到的问题。

## 二、抓手机的请求包
### http请求抓包
***
首先，需要获取本机的 IP 地址。

打开 Charles 后，在 Help 选项下选择 Local IP Address 可以看到本机的 IP 地址。如果获取的是 IPv6 地址。也可以在Mac上按住 option 键点击WIFI图标获得 IPv4 格式地址。如下图所示：
<div align="center">
    <img width="60%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/%E5%89%8D%E7%AB%AF%E5%B7%A5%E5%85%B7/Cha1.png"/>
    <p style="color: grey">获取本机IP地址</p>
</div>

在 iPhone 上的 wifi 手动设置 HTTP 代理，服务器地址为电脑的 IP 地址，端口号为8888。 然后在 Charles 的工具栏上打开 Recording 按钮，用手机浏览器访问页面或打开App，在 Charles 中即可看到 http 请求包。

### https请求抓包
***
#### iPhone手机抓https包
iPhone 抓取 HTTPS 的包，网上配置很多，这里就不详细介绍了，附[网络教程](http://www.jianshu.com/p/235bc6c3ca77)供大家参考。

**补充两点技巧：**

+ 技巧1：按以上操作设置后，如果 iPhone 抓取 https 请求包时显示 **unknown**。  
则说明Charles的证书在只在本机安装了，但还未设为信任，需要按照此步骤进行设置：**通用 —> 关于本机 —> 证书信任设置 —> CA勾选**。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha2.png"/>
    <p style="color: grey">https请求Unknown</p>
</div>

+ 技巧2：针对 Proxy —> SSL Proxying Settings 的配置地址，如果不想每个域名都设置一次，可以直接把 Host 和 Port 都设为 *，允许抓取所有域名的请求包。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha3.png"/>
    <p style="color: grey">允许抓取所有SSL代理的数据包</p>
</div>

#### 安卓（小米）手机抓https包
安卓的手机抓包与IOS相似，都需要按照以下4步来抓 https 请求包：   

1. 电脑装证书  
2. 移动设备安装证书  
3. Charlse 添加 SSL Proxying  
4. 手机使用 Mac 代理访问目标域名  

**补充两种安装失败情况及解决办法**

+ 情况1：若遇到在模拟器/手机的浏览器中输入[http://charlesproxy.com/getssl](http://charlesproxy.com/getssl) 不是弹一个框，而是出现了图4情况，可能是因为手机没有将电脑的 IP 地址设为代理（端口号为8888）

<div align="center">
    <img width="60%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha4.png"/>
    <p style="color: grey">未将手机设置代理即访问getssl链接</p>
</div>

+ 情况2：小米手机安装证书提示“没有可安装的证书”，解决方式：  

a、打开 Charles 的 HELP -> SSL Proxying -> Export Charles Root Certification and Private Key，输入任意密码，导出 pem 文件。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha5.png"/>
    <p style="color: grey">Charles 导出 Pem 文件提取证书</p>
</div>

b、导出后，用微信或者其他方式将 pem 文件传到安卓手机里。在 WLAN设置 —> 安装证书，打开该文件，输入导出时设置的密码就行了。

例如通过微信方式的路径为：WLAN -> 高级设置 -> 安装证书 -> Tencent文件夹 -> MicroMsg文件夹 -> Download文件夹

<div align="center">
    <img width="50%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha6.png"/>
    <p style="color: grey">小米手机安装证书</p>
</div>

**Charles原理解析** 

Charles 抓包安装的证书，电脑和手机是配对的。不管是通过访问 [http://charlesproxy.com/getssl](http://charlesproxy.com/getssl)（因为 Mac 已经开启代理，所以访问这个地址实际上返回的是本机的 Charles 证书，而并没有访问 charlesproxy.com 这个网站），还是通过手动安装，实际上安装的都是对应本机的 SSL 证书。所以如果安装证书的手机和电脑不是配对关系的话，即使两者都有证书也是不能抓包的。

## 三、用本地文件替换线上文件
### 替换beta上文件
***
a、首先需要 Chrome 安装 SwitchySharp 插件并配置 Charles 代理，这样 Chrome 下的链接才会走 Charles 发送。
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha7.png"/>
    <p style="color: grey">SwitchySharp 插件配置</p>
    <img src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha8.png"/>
    <p style="color: grey">记得要切换到 Charlse 链接</p>
</div>

b、打开Charles，选择 Tools —> No caching Seting，勾选Enable No Caching，确保不会因为文件缓存影响代码生效。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha9.png"/>
    <p style="color: grey">Charles不启用缓存设置</p>
</div>

另外，Chrome 控制面板里的 Network 设置，最好也勾选 Disable Cache 选项。这样可以在浏览器调试阶段也不启用缓存，防止修改了代码，但因为浏览器缓存而未生效。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha10.png"/>
    <p style="color: grey">Chrome不启用缓存设置</p>
</div>

c、单个文件的替换。选择 Tools —> Map Local Settings 将线上文件映射到本地文件, 点击选择要替换的文件(例如：mm-order-list.*.js)。protocal 如果置空，则默认匹配所有协议。  
`注意：webpack打包的项目可能还需要根据实际情况映射 manifest.*.js 和 common.*.js 才可以完成替换。`
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha11.png"/>
    <p style="color: grey">Charles替换单个文件配置</p>
</div>

d、文件夹整体替换。按照步骤c，我们已经可以进行单文件替换了，但单独设置太麻烦。所以我们直接进行文件夹整体替换。以配置 app-menuorder-h5 的项目为例，Host 和 Local Path 配置如下图所示:
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha12.png"/>
    <p style="color: grey">Charles替换文件夹Map Local Setting</p>
</div>

配置完成 Map Local Settings 后，还需要配置 Rewrite 选项，实现对文件的重写替换。通过正则表达式来替换对应目录下所有文件。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha13.png"/>
    <p style="color: grey">Charles替换文件夹 Rewrite Setting </p>
</div>

e、最后，刷新浏览器，如果 http 的 Respone Header 里有 X-Charles-Map-Local 字段则代表本地文件替换成功。  
   <!-- `注意：如果是 https 链接，需要配置 Charles 支持对应域名的 https 协议才可以生效` -->
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha14.png"/>
    <p style="color: grey">文件替换成功效果图</p>
</div>

### 替换生产环境的文件（跨域）
***
用本地文件替换生产环境的文件同样需要设置 Map Local Settings 和 Rewrite Settings 两项。     

a、设置 Map Local Settings 进行文件目录映射，只需要把 Host 改成静态文件存储的域名即可，本例 Host: www.dpfile.com

b、设置 Rewrite Settings，这里需要分成两步：  

第一步，指定替换文件，注意线上的文件因为被压缩过，所以文件名中可能会有 “min” 字段。 
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha15.png"/>
    <p style="color: grey">生产环境设置Map Local Settings 文件替换目录</p>
</div>

第二步，由于 m.dianping.com 引用映射后的 www.dpfile.com 域下的文件，从而导致跨域问题。 

请注意这里需要对问题进行区分：

情景一：Response Header 不包含 Access-Control-Allow-Origin 与 Access-Control-Allow-Credentials 字段，则需手动添加两个字段。
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha16.png"/>
    <p style="color: grey">生产环境产生的跨域问题</p>
</div>

**所以需要对 dpfile.com 域下的 Response Header 添加字段**
Access-Control-Allow-Credentials: true 与 Access-Control-Allow-Origin: *，从而允许 dpfile.com 域下的文件被其他域所引用。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha17.png"/>
    <p style="color: grey">通过给Response Header添加字段，允许dpfile域下文件被引用</p>
</div>

情景二：Response Header 如已包含 Access-Control-Allow-Origin 字段，则只需添加 Access-Control-Allow-Credentials。不能再添加 Access-Control-Allow-Origin，否则会报错。

<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha19.png"/>
    <p style="color: grey">Response Header 已有 Access-Control-Allow-Origin 字段，重复添加报错</p>
</div>

按以上配置设置完毕后，即可用本地文件替换生产环境线上文件：）

## 四、其他
### 筛选指定域下的请求
***
由于 Charles 会抓取手机发出的全部请求包，为了能快速定位我们需要的请求，可以对 Charles 的抓包请求进行筛选，具体方法是：Setting —> Recording Setting —> Include，设置只展示特定域的请求包。
<div align="center">
    <img width="70%" src="https://raw.githubusercontent.com/Dragon-Rider/Front-End-Learning/master/img/前端工具/Cha18.png"/>
    <p style="color: grey">Charles筛选特定域下的请求</p>
</div>

## 参考文档
+ [详解Charles](http://blog.csdn.net/guoguo527/article/details/52287837)
+ [iPhone安装charles](http://www.jianshu.com/p/235bc6c3ca77)
+ [Charles抓取https时一直显示unknown](https://segmentfault.com/q/1010000009188854)
+ [Charles https抓包 — Android —— 美团谢敏](https://wiki.sankuai.com/pages/viewpage.action?pageId=664420154)

**[回到目录](#目录)**
