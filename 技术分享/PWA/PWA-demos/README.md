#How to start PWA demo code
1、cd到demo code的文件夹  
2、打开一个本地服务器，因为PWA不支持本地文件协议（file://  ）
    base运行如下命令即可启动本地server, 默认打开的是8000端口，如果想打开别的端口则可直接在最后加上端口号即可。

    python -m SimpleHTTPServer 8080  //启动服务器，并打开8080端口


3、访问 url: [http://localhost:8000/](http://localhost:8000/) 即可，打开console控制台查看  
4、chrome提供了内置工具查看浏览器启动的service worker，访问地址：[chrome://inspect/#service-workers](chrome://inspect/#service-workers) 
