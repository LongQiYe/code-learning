#include "stm32f10x.h"

int main(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1,ENABLE); //开启时钟
	
	USART_InitTypeDef USART_InitStruct; //声明结构体
	
	USART_InitStruct.USART_BaudRate = 115200;//波特率115200
	USART_InitStruct.USART_Mode = USART_Mode_Tx | USART_Mode_Rx;//双向
	USART_InitStruct.USART_WordLength = USART_WordLength_8b;//8位数据位
	USART_InitStruct.USART_Parity = USART_Parity_No; //无校验
	USART_InitStruct.USART_StopBits = USART_StopBits_1;//1位停止位
	
	USART_Init(USART1,&USART_InitStruct);//初始化USART
	
//	GPIO_InitTypeDef GPIO_InitStruct;//声明
//	//Tx PA9 复用输出推挽
//	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
//	GPIO_InitStruct.GPIO_Pin = GPIO_Pin_9;
//	GPIO_InitStruct.GPIO_Mode = GPIO_Mode_AF_PP;//模式
//	GPIO_InitStruct.GPIO_Speed = GPIO_Speed_10MHz;//最大速度
//	GPIO_Init(GPIOB,&GPIO_InitStruct);
//	//Rx PB7 输入浮空 输入上拉
//	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB,ENABLE);
//	GPIO_InitStruct.GPIO_Pin = GPIO_Pin_7;
//	GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IPU;//模式
//	GPIO_Init(GPIOB,&GPIO_InitStruct);
//	
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO,ENABLE);
	GPIO_PinRemapConfig(GPIO_Remap_USART1,ENABLE);
	
	GPIO_InitTypeDef GPIO_InitStruct;
	//Tx PB6输出推挽
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB,ENABLE);
	GPIO_InitStruct.GPIO_Pin = GPIO_Pin_6;
	GPIO_InitStruct.GPIO_Mode = GPIO_Mode_AF_PP;
	GPIO_InitStruct.GPIO_Speed = GPIO_Speed_10MHz;
	GPIO_Init(GPIOB,&GPIO_InitStruct);
	//Rx PB7 输入浮空 输入上拉
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB,ENABLE);
	GPIO_InitStruct.GPIO_Pin = GPIO_Pin_7;
	GPIO_InitStruct.GPIO_Mode = GPIO_Mode_IPU;
	GPIO_Init(GPIOB,&GPIO_InitStruct);
	
	
	
	while(1)
	{

	}
}
