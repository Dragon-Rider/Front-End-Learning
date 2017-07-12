###<图解HTTP>学习笔记

####第一章 了解web及网络基础

1.3  通常使用的网络(包括互联网)是在TCP/IP协议族的基础上运作的.而HTTP属于它内部的一个子集.

1.3.1  TCP/IP是在IP协议的通信过程中,使用到的协议族的统称.

1.3.2 TCP/IP通信传输流
<pre>
    应用层: HTTP协议

    传输层: TCP

    网络层: IP

    链路层: 网络
</pre>

1.4.1 负责传输的IP协议

* IP协议的作用是把各种数据包传送给对方.而要保证确实传送到对方那里,则需要满足各类条件.其中两个重要的条件是IP地址和MAC地址。
* 没有人能够全面掌握互联网中的传输状况

1.4.2 确保可靠性的TCP协议
* TCP协议为了更容易传送大数据才把数据分割,而且TCP协议能够确认数据最终是否送达到对方.
* 发送端首先发送一个带SYN标志的数据包给对方.接收端收到后,回传一个带有SYN/ACK标志的数据包以式传达确认信息.最后发送端再回传一个带ACK标志的数据包,代表"握手"结束.

1.7.1 URI和URL
* 统一资源标识符(URI: Uniform Resource Identifier)
* URI用字符串标示某一互联网资源,而URL表示资源的地点(互联网上所处的位置).可见URL是URI的子集.

####第二章 简单的HTTP协议
2.1 有时候,按实际情况,两台计算机作为客户端和服务器的角色有可能会互换.但就仅从一条通信路线来说,服务器端和客户端的角色是确定的,而用HTTP协议能够明确区分哪端是客户端,哪端是服务端.

2.3 HTTP是不保存状态的协议
* HTTP是一种不保存状态,即无状态(stateless)协议.HTTP协议自身不对请求和响应之间的通信状态进行保存.也就是说在HTTP这个级别,协议对于发送过的请求和响应都不做持久化处理.
* HTTP/1.1虽然是无状态协议, 但为了实现期望的保持状态功能,于是引入了Cookie技术.有了Cookie再用HTTP协议通信,就可以管理状态了.

2.8 Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态.Cookie会根据从服务器端发送的响应报文内一个叫做Set-Cookie的首部字段信息,通知客户端保存Cookie.当下次客户端再往该服务器发送请求时,
客户端会自动在请求报文中加入Cookie值后发送出去.


####第三章 HTTP报文内的HTTP信息
3.3.1 通常,报文主体等于实体主体.只有当传输中进行编码操作时,实体注意的内容发生变化,才导致它和报文主体产生差异.

3.5 获取部分内容的范围请求
* 可恢复机制的实现需要指定下载的实体范围. 像这样,指定范围发送的请求叫做范围请求(Range Request)
* 针对范围请求,响应会返回状态码为206 Partial Content的响应报文.

####第四章 返回结果的HTTP状态码
> 2XX Success(成功状态码) 请求正常处理完毕
* 200 OK: 表示从客户端发来的请求在服务器端被正常处理了. 在响应报文内,随状态码一起返回的信息会因方法的不同而发生改变.比如,使用Get方法时,对应的请求资源的实体会作为响应返回;而使用HEAD方法时,对应请求资源的实体
首部不随报文主体作为响应返回(即在响应中只返回首部,不会返回实体的主体部分)
* 204 No Content: 返回20响应,那么浏览器显示的页面不发生更新.
* 206 Partial Content: 该状态码表示客户端进行了范围请求,而服务器成功执行了这部分的Get请求.响应报文中包含由Content-Range指定范围的实体内容

> 3XX Redirection(重定向状态码) 需要进行附加操作以完成请求
* 301 Moved Permanently 永久性重定向
* 302 Found 临时性重定向
* 303 See Other 该状态码表示由于请求对应的资源存在着另一个URI,应使用GET方法定向获取请求的资源
* 304 Not Modified 自从上次请求后，请求的网页未修改过。服务器返回此响应时，不会返回网页内容。
* 307 Temporary Redirect 临时重定向.该状态码与302 Found 有着相同的含义.尽管302标准禁止POST变换成Get,但实际使用时大家并不遵守.307会遵照浏览器标准,不会从POST变成Get.

- Note:
- 当301,302,303响应状态码返回时,几乎所有的浏览器都会把POST改成GET,并删除请求报文内的主体,之后请求会自动再次发送. 301,302标准是禁止将POST方法改成GET方法的,但实际使用时大家都会这么做.
- 301,302,303和307的效果差别:http://blog.sina.com.cn/s/blog_62ec29160101f3u3.html

> 4XX Client Error(客户端错误状态码) 服务器无法处理请求
* 400 BadRequest 该状态码表示请求报文中存在语法错误. 另外,浏览器会像200 OK一样对待该状态码
* 401 Unauthorized 该状态码表示发送的请求需要有通过HTTP认证的认证信息.
* 403 Forbidden 该状态码表明对请求支援的访问被服务器拒绝了.
* 404 Not Found 该状态码表明服务器上无法找到请求的资源.

> 5XX Server Error(服务器错误代码) 服务器处理请求出错
* 500 Internal Server Error 该状态码表明服务器端在执行请求时发生了错误.
* 503 Service Unavailable 该状态码表明服务器暂时处于超负债或正在进行停机维护,现在无法处理请求

####第五章 与HTTP协作的Web服务器
5.1 在相同的IP地址下,由于虚拟主机可以寄存多个不同主机名和域名的web网站,因此在发送HTTP请求时,必须在HOST首部内完整指定主机名或域名的URI
5.2 通信数据转发程序: 代理, 网关, 隧道
<pre>
    代理: 代理服务器的基本行为就是接收客户端发送的请求后转发给其他的服务器

    网关: 网关的工作机制和代理十分相似. 而网关能使通信线路上的服务器提供非HTTP协议服务.

    隧道: 隧道可按要求建立起一条与其他服务器的通信线路, 届时使用SSL等加密手段进行通信.

</pre>

####第六章 http首部
+ 报文首部
    + 请求行
        + 方法
        + URI
        + HTTP版本
    + 通用首部字段
        + Cache-Control
        + Connection   不发给代理服务器
        + Date
        + Pargram
        + Trailer
        + Transfer-Encoding
        + Upgrade
        + Via
        + Warning
    + 请求首部字段
        + Accept
        + Accept-Charset
        + Accept-Encoding
        + Accept-Language
        + Authorization
        + Expect
        + From
        + Host
        + If-Match
        + If-Modified-Since
        + If-None-Match
        + If-Range
        + If-Unmodified-Since
        + Max-Forwards
        + Proxy-Authorization
        + Range
        + Referer
        + Te
        + User-Agent
    + 响应首部字段
        + Accept-Ranges
        + Age
        + Etag
        + Location
        + Proxy-Authenticate
        + Retry-After
        + Server
        + Vary
        + WWW-Authorization
    + 实体首部字段
        + Allow
        + Content-Encoding
        + Content-Language
        + Content-Length
        + Content-Location
        + Content-md5
        + Content-range
        + Content-type
        + Expires
        + Last-Modified
    + 非 HTTP1.1 首部字段
        + 为Cookie服务的首部字段
            + Set-Cookie
            + Cookie
        + 其他首部字段
            + x-frame-options
            + x-xss-protection
            + dnt
            + p3p
+ 空行(CR+LF)
+ 报文主体
