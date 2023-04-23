> Ở một của hàng có bán nhiều loại trái cây, hiện đang có một chương trình khuyến mãi khi mua hàng, mỗi loại trái cây sẽ có khuyến mãi riêng trên từng sản phẩm và trên tổng số lượng của sản phảm đó(lấy discount cao nhất để áp dụng, ví dụ: táo có giá là 5.000 mua 1 được giảm 5%, mua từ 2 trở lên được giảm 10%, thì khi mua 3 quả thì tổng tiền phải trả là 3 * 5.000 * (100 - 10)%). Viết một chuơng trinh (không cần UI) giúp của hàng trên tính tổng số tiền phải thanh toán trên mỗi hoá đơn mua hàng.(Các chức năng cơ bản, thêm, sửa, xoá sp vào đơn hàng, thanh toán)(Yêu cầu viết Unit test).

Các case có thể xảy ra:

- Đơn hàng rỗng
  - Không có sản phẩm nào trong đơn hàng
  - Tổng tiền bằng 0
  
- Đơn hàng có một loại trái cây
  Sản phẩm là táo có giá là 5000 mỗi quả, có khuyển mãi trên 1 quả là 5 %, khuyến mãi khi mua từ 2 quả trở đi là 10%.
  - Thêm 1 quả táo vào đơn hàng
    - Đơn hàng có táo, và số lựọng là 1
    - Tổng tiền là `4750`
  - Thêm hơn nhiều hơn 1 quả táo vào đơn hàng(2)
    - Đơn hàng chỉ có táo và số lượng là 2
    - Tổng tiền là `9000`
- Đơn hàng có nhiều hơn một loại trái cây
  Sản phẩm là táo có giá là 5000 mỗi quả, có khuyển mãi trên 1 quả là 5 %, khuyến mãi khi mua từ 2 quả trở đi là 10%.
  Sản phẩm là chanh có giá là 2000 mỗi quả, có khuyển mãi trên 2 quả là 5 %, khuyến mãi khi mua từ 4 quả trở đi là 10%.
  - Thêm 2 quả táo vào đơn hàng
    - Đơn hàng chỉ có táo, và số lựọng là 2
    - Tổng tiền là `9000`
  - Thêm 1 quả chanh vào đơn hàng
    - Đơn hàng có táo và chanh, số lượng táo 2, chanh 1
    - Tổng tiền là `11000`
  - Xoá táo ra khỏi đơn hàng
    - Đơn hàng chỉ còn chanh
    - Tổng tiền là `2000`
