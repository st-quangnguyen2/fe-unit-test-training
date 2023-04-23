- Liệt kê tất cả các test cases mà bạn có thể nghĩ ra để kiểm tra 1 mảng có phải là mảng số tăng dần hay không
  | Input | Output |
  | :----: | :----: |
  | null | false |
  |  | false |
  | undefined | false |
  | 1 | false |
  | '' | false |
  | {} | false |
  | Function | false |
  | true | false |
  | false | false |
  | [] | false |
  | [ 1 ] | false |
  | [ 1, null] | false |
  | [ 1, undefined ] | false |
  | [ 1, '' ] | false |
  | [ 1, {} ] | false |
  | [ 1, [] ] | false |
  | [ 1, Function ] | false |
  | [ 2, 1] | false |
  | [ 2.1, 2, 2.2] | false |
  | [ 1, 1 ] | true |
  | [ 1, 2 ] | true |
  | [ 1, 2, 3] | true |
  | [ 1, 2, 2] | true |
  | [ 2, 3, 5, 7 ] | true |
