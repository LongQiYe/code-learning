![[Pasted image 20260712125706.png]]
<center>图1</center>![[Pasted image 20260712203323.png]]
```c
#include "stm32f10x.h"

int main(void)
{
    // 1. 开启 GPIOA 时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

    GPIO_InitTypeDef GPIO_InitStruct;

    // 2. 配置 PA0 为推挽输出，2MHz
    GPIO_InitStruct.GPIO_Pin   = GPIO_Pin_0;
    GPIO_InitStruct.GPIO_Mode  = GPIO_Mode_Out_PP;
    GPIO_InitStruct.GPIO_Speed = GPIO_Speed_2MHz;
    GPIO_Init(GPIOA, &GPIO_InitStruct);//第一次写时，没有加这句，导致PA0没有被初始化

    // 3. 配置 PA1 为上拉输入
    GPIO_InitStruct.GPIO_Pin  = GPIO_Pin_1;
    GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IPU;
    GPIO_Init(GPIOA, &GPIO_InitStruct);

    while(1)
    {
        if(GPIO_ReadInputDataBit(GPIOA, GPIO_Pin_1) == Bit_RESET)
            GPIO_WriteBit(GPIOA, GPIO_Pin_0, Bit_SET);
        else
            GPIO_WriteBit(GPIOA, GPIO_Pin_0, Bit_RESET);
    }
}
```
