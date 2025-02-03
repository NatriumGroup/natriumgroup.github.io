document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        document.getElementById('result').innerHTML = '<p>请输入查询内容！</p>';
        return;
    }

    // 模糊匹配黑名单数据，包括所有字段
    const results = blacklistData.filter(item => {
        // 对每个字段进行检查，如果是数组则检查其中的每个元素是否匹配
        return Object.keys(item).some(key => {
            const value = item[key];
            if (Array.isArray(value)) {
                return value.some(val => val.includes(query)); // 如果是数组，检查每一项
            } else {
                return value.includes(query); // 不是数组直接匹配
            }
        });
    });

    const resultElement = document.getElementById('result');
    if (results.length > 0) {
        resultElement.innerHTML = `
            <h2>查询结果：</h2>
            <ul>
                ${results.map(item => `
                    <li>
                        <strong>姓名：</strong>${item.name.join(', ')}<br>
                        <strong>QQ：</strong>${item.qq.join(', ')} (${item.qqNickname.join(', ')})<br>
                        <strong>手机号：</strong>${item.phone.join(', ')}<br>
                        <strong>支付宝账号：</strong>${item.alipay.join(', ')}<br>
                        <strong>微信账号：</strong>${item.wechat.join(', ')}<br>
                        <strong>银行卡：</strong>${item.bankCard.join(', ')}<br>
                        <strong>身份证：</strong>${item.idCard.join(', ')}<br>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        resultElement.innerHTML = '<p>未找到相关数据。</p>';
    }
});
