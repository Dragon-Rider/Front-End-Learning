---
layout: default
title: {{ site.name }}
---

# 版本控制工具Git

> Git是重要的版本控制工具，这里列一些平常比较少用的Git语法, 作为备忘录。

### 1. Commit之后重新修改Commit Message的内容
```bash
    $ git commit --amend -m "the new message" 
```

### 2. 丢弃还未commit的本地修改
```bash
    $ git checkout -f 
```

### 3. git查看分支图表
```bash
    $ git log --graph
```

### 4. 合并分支git rebase与git merge 
```bash
    $ git rebase dev        //将dev分支合并到当前分支，并且删除dev分支，确保只有一条分支流
    $ git merge --no-ff dev //将dev分支合并到当前分支(不使用fast-forward方式), 将多分支在流图里都展现
    $ git merge dev         //将dev分支合并到当前分支(使用fast-forward方式), 如果更新了新分支后，原分支没有改动，则修改会合入原分支, 同rebase效果一样。
```
这里可以绘制图表比较三者关系，参考下面的文档，写的很清楚。  
- [git merge和git rebase小结](http://blog.csdn.net/wh_19910525/article/details/7554489)  
- [git merge --no-ff是什么意思](https://segmentfault.com/q/1010000002477106)  

### 5. git删除本地和远程分支
远程分支删除：
```bash
    $ git push origin --delete <branchName>
```

本地分支删除：
```bash
    $ git branch -d <branchName>
```

### 6. git垃圾回收机制
```bash
    $ git gc
```
在大的仓库中, git靠压缩历史信息来节约磁盘和内存空间，压缩操作并不是自动进行的, 你需要手动执行 git gc。压缩操作比较耗时, 你运行git gc命令最好是在你没有其它工作的时候。

### 7. git多行注释，打出"后即可在bash总换行
```bash
    $ git commit -a -m "
    1. update;
    2. update;
    3. update;"
```

### 8. git标签
```bash
    $ git tag v1.0.1           // 打标签
    $ git tag                  // 显示所有标签
    $ git checkout tag         // 切换到某个标签
    $ git tag -d v1.0.1        // 删除本地tag
    $ git push origin :v1.0.1  // 删除远程tag
```

## 参考文档
- [How to rename commit messages in Git?](https://stackoverflow.com/questions/10748749/how-to-rename-commit-messages-in-git)
- [维护Git(git gc)](http://gitbook.liuhui998.com/4_10.html)
- [Git查看、删除、重命名远程分支和tag](https://blog.zengrong.net/post/1746.html)
- [为什么你应该停止使用 Git rebase 命令](https://zhuanlan.zhihu.com/p/29682134?group_id=900676029545332736)
