used git-bash managed env to update this repo

## 一般流程

- 钱包地址发给远端服务器，然后接受返回的签名，再提交给合约的申领方法，
- 领到后，approve spending,然后卖掉（一部分）
- 手工通常会在服务器繁忙（高利润时期）的时候失败，失掉利润的90%以上

## propose  

找到以下网站，如何通过 post/get方法，得到merkle tree proof，或者signature

## 提示：
可以从chrome的工具-network开始追踪，得到post/get方法和返回

最简单的应该是得到：
try {
      const response = await axios.post('https://arbshib.io/api/arb/eligibility/claim', {
        address: signer.address
      });

src\claim.js有完整示例

## 实际的金狗、土狗

https://rektarb.xyz/?ref=addr

https://arbdoge.ai/

https://www.foxe.vip/

https://www.pepe.vip/
