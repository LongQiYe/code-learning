已知：给LED 2~10mA的电流，LED就可以发光。

如何让通过LED的电流为2~10mA呢？
给他串联一个限流电阻（串联分压，并联分流）

串联电阻的阻值怎么算？
二极管的导通压降是0.7V，Vdd的电压为3.3V
所以Vdd到LED阳极的电压差为3.3V-0.7V=2.6V
R = U / I
	= 2.6V / 5mA
	= 520Ω
所以限流电阻的阻值为520Ω与电路中的510Ω相差不大
### 一、LED推挽接线图
![[Pasted image 20260712110359.png]]
<center>图1</center>
![[Pasted image 20260712110546.png]]
<center>图2</center>
如图2所示，上边MOS管是推，下边MOS管挽

### 二、LED开漏接线图
![[Pasted image 20260712112922.png]]
<center>图3</center>
![[Pasted image 20260712112727.png]]
<center>图4</center>
### 三、GPIO模块编程接口
![[Pasted image 20260712115831.png]]
<center>图5</center>
![[Pasted image 20260712115924.png]]
<center>图6</center>
```c
#include "stm32f10x.h"
#include "delay.h"

int main(void)
{
	//#1.开启GPIOC的时钟
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC,ENABLE);
	
	//#2.初始化IO引脚，PC13 通用输出开漏模式 2MHz
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	
	GPIO_InitStruct.GPIO_Pin = GPIO_Pin_13;
	GPIO_InitStruct.GPIO_Mode = GPIO_Mode_Out_OD;
	GPIO_InitStruct.GPIO_Speed = GPIO_Speed_2MHz;
	
	GPIO_Init(GPIOC,&GPIO_InitStruct);
	
//	GPIO_WriteBit(GPIOC,GPIO_Pin_13,Bit_SET);//写1
//	GPIO_WriteBit(GPIOC,GPIO_Pin_13,Bit_RESET);//写0
	while(1)
	{
		GPIO_WriteBit(GPIOC,GPIO_Pin_13,Bit_RESET);//写0
		
		Delay(100);
		
		GPIO_WriteBit(GPIOC,GPIO_Pin_13,Bit_SET);//写1
		
		Delay(100);
	}
}

```
