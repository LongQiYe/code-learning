[[C学习计划#第一遍：快速过语法]]
## 第一遍：快速过语法

重点章节快速看完：

> 第2、3、4、5、6、7、9章

```C
# include <stdio.h>  
int main() {  
    int num = 1;  
    printf("I am a simple ");  
    printf("computer.\n");  
    printf("My favorite number is %d because it is first.\n",num);  
    //%d表示，把变量作为十进制整数打印
    return 0;  
}
```

```C
printf("I am a simple");
```
把I am a simple传递给`printf()`函数。该信息被称为参数，或者更确切地说，是函数的实际参数（actual argument）。在C语言中，实际参数（简称实参）是传递给函数的特定值，形式参数（简称形参）是函数中用于储存值的变量。
%d，是将后边的内容填写到%d里边
```c
printf("%d",12+4);
```
变量的定义一般形式`<类型名称><变量名称>`
例子：int price;

格式化输入（scanf)f的意思是format
```c
scanf("price%d\n",&a);//&是取地址符
```
出现在scanf格式中的东西是一定需要输入的，包括price，\n（这个不能用回车替代，只能键盘输入）

```c
const int a - 100;//a是一个只能读的变量，不可以赋值
```

浮点数（单精度float，双精度double）
单精度的输入输出用%f
双精度的输入用%lf，输出用%f或%lf
```c
float a;
double b;
scanf("%f",&a);
printf("%f",a);

scanf("%lf",&b);
printf("%f",b);
prinf("%lf",b);
```

| 类型       | `printf` 输出 | `scanf` 输入 |
| -------- | ----------- | ---------- |
| `float`  | `%f`        | `%f`       |
| `double` | `%f`        | `%lf`      |

## 为什么 `printf` 中 float 和 double 都用 `%f`

因为 `printf` 是可变参数函数。`float` 作为参数传入时，会发生**默认参数提升**，自动转换成 `double`：

```c
float a = 1.5f;
printf("%f\n", a);
```

传给 `printf` 的实际类型已经是 `double`。

因此在 `printf` 中：

```c
%f   // 接收 double
%lf  // 在现代 C 标准中效果也等同于 %f
```

也就是说，下面两句通常都可以：

```c
printf("%f\n", b);
printf("%lf\n", b);
```

但更推荐统一写：

```c
printf("%f\n", b);
```

因为更常见，也更不容易和 `scanf` 混淆。

## 为什么 `scanf` 必须区分

`scanf` 接收的是变量地址：

```c
float  *   对应 %f
double *   对应 %lf
```

`float` 通常占 4 字节，`double` 通常占 8 字节。

如果写错：

```c
float a;
scanf("%lf", &a);
```

`scanf` 会把 `&a` 当作 `double *`，尝试写入通常 8 字节，但 `a` 只有通常 4 字节，可能破坏旁边的内存，属于未定义行为。

同样：

```c
double b;
scanf("%f", &b);
```

`scanf` 会把 `&b` 当作 `float *`，只按 `float` 的方式写数据，也属于类型不匹配和未定义行为。

## 最好这样记

> **输出不区分：float 和 double 都用 `%f`。**  
> **输入要区分：float 用 `%f`，double 用 `%lf`。**

补充一个常见情况，输出科学计数法：

```c
printf("%e\n", b);
```

输出有效数字较简洁的格式：

```c
printf("%g\n", b);
```

运算符优先级
![[Pasted image 20260710160815.png]]


复合运算符（+=，-=，\*=，/=，%=）
total += sum + 5；——>total = total + (sum+5)；
递增递减运算符（++，--）
count++ ——>count = count + 1；
count-- ——>count = count - 1；


```c
#include <stdio.h>  
int main() {  
    int a = 10,b = 10;  
    printf("%d\n", a++);  
    printf("%d\n", ++b);  
}
```
输出是：

```text
10
11
```

原因在于 `a++` 和 `++b` 的“自增时机”不同。

```c
printf("%d\n", a++);
```

`a++` 是**后置自增**：

1. 先取出 `a` 当前的值 `10`，作为表达式结果传给 `printf`
    
2. 再将 `a` 增加为 `11`
    

所以第一行输出：

```text
10
```

执行完后：

```c
a == 11
```

而：

```c
printf("%d\n", ++b);
```

`++b` 是**前置自增**：

1. 先将 `b` 从 `10` 增加到 `11`
    
2. 再把增加后的值 `11` 传给 `printf`
    

所以第二行输出：

```text
11
```

程序执行结束时：

```c
a == 11
b == 11
```

可以这样记：

```c
a++   // 先使用，后加一
++a   // 先加一，后使用
```

不过这里的“先后”指的是**这个表达式最终产生哪个值**，不要把它无限推广到复杂表达式中。例如：

```c
printf("%d %d\n", a++, a++);
```

这种在 C 语言中可能涉及未定义行为，不应该这样写。

```C
#include<stdio.h>  
int main() {  
    int A ,B;  
    printf("A=");  
    scanf("%d",&A);  
    printf("B=");  
    scanf("%d",&B);  
    printf("%d + %d = %d\n",A,B,A+B);  
    printf("%d - %d = %d\n",A,B,A-B);  
    printf("%d * %d = %d\n",A,B,A*B);  
    printf("%d / %d = %d\n",A,B,A/B);  
}
```
关系运算符（比较运算符）
![[Pasted image 20260710173832.png]]`
**关系运算符的优先级比算术运算符的底，但是比赋值运算符**
== !=的优先级比其他的低

if-else条件判断
```c
if(判断条件){
	输出;
}else{
	输出;q
}
```

***写代码，看的是，你能不能让足够多的人看懂你的代码***

