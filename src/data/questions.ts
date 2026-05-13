export type Category = 'python' | 'java' | 'c' | 'sql'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: string
  category: Category
  difficulty: Difficulty
  question: string
  code?: string
  options: [string, string, string, string]
  answer: number
  explanation: string
}

// ───────────────────────────────────────────────
// Python (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const pythonQuestions: Question[] = [
  // ── easy ──
  {
    id: 'python_001',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `x = [1, 2, 3]
print(x[1])`,
    options: ['1', '2', '3', 'IndexError'],
    answer: 1,
    explanation: '파이썬 리스트는 0부터 시작하므로 x[1]은 두 번째 요소인 2입니다.',
  },
  {
    id: 'python_002',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `d = {'a': 1, 'b': 2}
print(len(d))`,
    options: ['1', '2', '3', '4'],
    answer: 1,
    explanation: 'len()은 딕셔너리의 키 개수를 반환합니다. 키가 a, b 두 개이므로 2입니다.',
  },
  {
    id: 'python_003',
    category: 'python',
    difficulty: 'easy',
    question: '다음 빈칸에 들어갈 키워드로 올바른 것은?\n\n정의된 함수 내에서 외부 변수를 수정하려면 _____ 키워드를 사용한다.',
    options: ['local', 'global', 'static', 'extern'],
    answer: 1,
    explanation: 'global 키워드를 사용하면 함수 내부에서 전역 변수를 수정할 수 있습니다.',
  },
  {
    id: 'python_004',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `for i in range(3):
    print(i, end=' ')`,
    options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2 3 '],
    answer: 1,
    explanation: 'range(3)은 0, 1, 2를 생성합니다. end=" "로 줄바꿈 대신 공백으로 구분됩니다.',
  },
  // ── medium ──
  {
    id: 'python_005',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `def f(a, b=[]):
    b.append(a)
    return b

print(f(1))
print(f(2))`,
    options: ['[1]\\n[2]', '[1]\\n[1, 2]', '[1, 2]\\n[1, 2]', 'Error'],
    answer: 1,
    explanation: '기본 인자 b=[]는 함수 정의 시 한 번만 생성됩니다. 두 번째 호출 시 같은 리스트가 재사용되어 [1, 2]가 됩니다.',
  },
  {
    id: 'python_006',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `try:
    x = int("abc")
except ValueError as e:
    print("ValueError")
except Exception:
    print("Exception")
finally:
    print("done")`,
    options: ['ValueError', 'ValueError\\ndone', 'Exception\\ndone', 'done'],
    answer: 1,
    explanation: 'int("abc")는 ValueError를 발생시킵니다. finally 블록은 항상 실행되므로 ValueError\\ndone이 출력됩니다.',
  },
  {
    id: 'python_007',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `nums = [1, 2, 3, 4, 5]
result = list(filter(lambda x: x % 2 == 0, nums))
print(result)`,
    options: ['[1, 3, 5]', '[2, 4]', '[1, 2, 3, 4, 5]', '[]'],
    answer: 1,
    explanation: 'filter()는 조건(짝수)을 만족하는 요소만 남깁니다. 짝수는 2, 4이므로 [2, 4]입니다.',
  },
  {
    id: 'python_008',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `data = {'x': 10, 'y': 20, 'z': 30}
result = {k: v for k, v in data.items() if v > 15}
print(result)`,
    options: [
      "{'x': 10}",
      "{'y': 20, 'z': 30}",
      "{'x': 10, 'y': 20, 'z': 30}",
      "{}",
    ],
    answer: 1,
    explanation: '딕셔너리 컴프리헨션으로 값이 15 초과인 y: 20, z: 30만 남습니다.',
  },
  // ── hard ──
  {
    id: 'python_009',
    category: 'python',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
        return x
    return inner

f = outer()
print(f())
print(f())`,
    options: ['15\\n15', '15\\n20', '10\\n15', 'Error'],
    answer: 1,
    explanation: 'nonlocal x는 outer()의 x를 참조합니다. 첫 호출 시 10+5=15, 두 번째 호출 시 15+5=20입니다. 클로저가 상태를 유지합니다.',
  },
  {
    id: 'python_010',
    category: 'python',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `class Meta(type):
    def __new__(mcs, name, bases, ns):
        ns['greet'] = lambda self: f"Hello from {name}"
        return super().__new__(mcs, name, bases, ns)

class MyClass(metaclass=Meta):
    pass

obj = MyClass()
print(obj.greet())`,
    options: ['Hello from Meta', 'Hello from MyClass', 'Hello from object', 'AttributeError'],
    answer: 1,
    explanation: '메타클래스 Meta는 클래스 생성 시 greet 메서드를 동적으로 추가합니다. name은 "MyClass"이므로 "Hello from MyClass"가 출력됩니다.',
  },
]

// ───────────────────────────────────────────────
// Java (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const javaQuestions: Question[] = [
  // ── easy ──
  {
    id: 'java_001',
    category: 'java',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `public class Main {
    public static void main(String[] args) {
        int a = 5, b = 3;
        System.out.println(a % b);
    }
}`,
    options: ['1', '2', '3', '5'],
    answer: 1,
    explanation: '5 % 3 = 2입니다. 나머지 연산자 %는 나눈 후의 나머지를 반환합니다.',
  },
  {
    id: 'java_002',
    category: 'java',
    difficulty: 'easy',
    question: '다음 빈칸에 들어갈 키워드는?\n\n상속받은 클래스가 부모 메서드를 재정의하려면 _____ 어노테이션을 사용하는 것이 권장된다.',
    options: ['@Interface', '@Override', '@Inherited', '@Super'],
    answer: 1,
    explanation: '@Override는 부모 클래스의 메서드를 오버라이딩함을 명시하며, 컴파일러가 시그니처를 검증합니다.',
  },
  {
    id: 'java_003',
    category: 'java',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);
System.out.println(s1.equals(s2));`,
    options: ['false\\nfalse', 'true\\nfalse', 'true\\ntrue', 'false\\ntrue'],
    answer: 2,
    explanation: '문자열 리터럴은 String Pool을 공유하므로 == 비교도 true입니다. equals()도 당연히 true입니다.',
  },
  {
    id: 'java_004',
    category: 'java',
    difficulty: 'easy',
    question: 'Java에서 인터페이스에 대한 설명으로 옳은 것은?',
    options: [
      '인터페이스는 인스턴스를 직접 생성할 수 있다.',
      '하나의 클래스는 여러 인터페이스를 구현할 수 있다.',
      '인터페이스의 모든 메서드는 반드시 private이다.',
      '인터페이스는 생성자를 가질 수 있다.',
    ],
    answer: 1,
    explanation: 'Java 클래스는 여러 인터페이스를 동시에 implements 할 수 있습니다. 인터페이스는 직접 인스턴스화할 수 없습니다.',
  },
  // ── medium ──
  {
    id: 'java_005',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `import java.util.*;
List<Integer> list = new ArrayList<>(Arrays.asList(3,1,2));
Collections.sort(list);
System.out.println(list);`,
    options: ['[3, 1, 2]', '[1, 2, 3]', '[2, 1, 3]', 'Exception'],
    answer: 1,
    explanation: 'Collections.sort()는 자연 순서(오름차순)로 정렬합니다. 결과는 [1, 2, 3]입니다.',
  },
  {
    id: 'java_006',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `class Animal {
    String sound() { return "..."; }
}
class Dog extends Animal {
    @Override
    String sound() { return "Woof"; }
}
Animal a = new Dog();
System.out.println(a.sound());`,
    options: ['...', 'Woof', 'null', 'CompileError'],
    answer: 1,
    explanation: '다형성에 의해 실제 객체 타입(Dog)의 메서드가 호출됩니다. 이를 동적 바인딩이라 합니다.',
  },
  {
    id: 'java_007',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `try {
    int[] arr = new int[3];
    arr[5] = 10;
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("A");
} catch (Exception e) {
    System.out.println("B");
} finally {
    System.out.println("C");
}`,
    options: ['A', 'B\\nC', 'A\\nC', 'C'],
    answer: 2,
    explanation: 'arr[5]는 크기 3인 배열 범위 초과로 ArrayIndexOutOfBoundsException 발생, "A" 출력 후 finally의 "C"가 출력됩니다.',
  },
  {
    id: 'java_008',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `import java.util.*;
Map<String,Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("a", 3);
System.out.println(map.size());
System.out.println(map.get("a"));`,
    options: ['2\\n1', '3\\n3', '2\\n3', '3\\n1'],
    answer: 2,
    explanation: 'HashMap은 중복 키를 허용하지 않습니다. "a"를 두 번 put하면 값이 3으로 갱신됩니다. size()는 2, get("a")는 3입니다.',
  },
  // ── hard ──
  {
    id: 'java_009',
    category: 'java',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `class Counter {
    private static int count = 0;
    Counter() { count++; }
    static int getCount() { return count; }
}
Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();
System.out.println(Counter.getCount());`,
    options: ['0', '1', '2', '3'],
    answer: 3,
    explanation: 'static 변수 count는 클래스 공유 변수입니다. 생성자가 3번 호출되어 count는 3이 됩니다.',
  },
  {
    id: 'java_010',
    category: 'java',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `interface Printable {
    default void print() { System.out.println("Interface"); }
}
class Base {
    void print() { System.out.println("Base"); }
}
class Child extends Base implements Printable {
    public static void main(String[] args) {
        new Child().print();
    }
}`,
    options: ['Interface', 'Base', 'CompileError', 'AmbiguousError'],
    answer: 1,
    explanation: '클래스 상속이 인터페이스 default 메서드보다 우선합니다. Child는 Base의 print()를 상속받으므로 "Base"가 출력됩니다.',
  },
]

// ───────────────────────────────────────────────
// C언어 (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const cQuestions: Question[] = [
  // ── easy ──
  {
    id: 'c_001',
    category: 'c',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int a = 10;
    int *p = &a;
    printf("%d\\n", *p);
    return 0;
}`,
    options: ['&a의 주소', '0', '10', 'Error'],
    answer: 2,
    explanation: '*p는 포인터 p가 가리키는 변수 a의 값을 역참조합니다. a = 10이므로 10이 출력됩니다.',
  },
  {
    id: 'c_002',
    category: 'c',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int arr[3] = {10, 20, 30};
    printf("%d\\n", arr[2]);
    return 0;
}`,
    options: ['10', '20', '30', '0'],
    answer: 2,
    explanation: '배열 인덱스는 0부터 시작하므로 arr[2]는 세 번째 요소인 30입니다.',
  },
  {
    id: 'c_003',
    category: 'c',
    difficulty: 'easy',
    question: '다음 빈칸에 들어갈 내용으로 올바른 것은?\n\n#define PI _____\nprintf("%.2f", PI * 3);',
    options: ['PI = 3.14', '3.14', '"3.14"', '(float)3.14'],
    answer: 1,
    explanation: '#define은 전처리기 지시자로 값을 직접 치환합니다. PI 자리에 3.14가 들어가 3.14 * 3이 계산됩니다.',
  },
  {
    id: 'c_004',
    category: 'c',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
struct Point { int x; int y; };
int main() {
    struct Point p = {3, 7};
    printf("%d\\n", p.y);
    return 0;
}`,
    options: ['3', '7', '0', 'Error'],
    answer: 1,
    explanation: '구조체 멤버 접근 연산자 .을 사용합니다. p.y는 7입니다.',
  },
  // ── medium ──
  {
    id: 'c_005',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
int main() {
    int x = 1, y = 2;
    swap(&x, &y);
    printf("%d %d\\n", x, y);
    return 0;
}`,
    options: ['1 2', '2 1', '0 0', 'Error'],
    answer: 1,
    explanation: '포인터를 통해 원본 값을 변경합니다. swap 후 x=2, y=1이 됩니다.',
  },
  {
    id: 'c_006',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
#include <stdlib.h>
int main() {
    int *p = (int*)malloc(sizeof(int) * 3);
    for (int i = 0; i < 3; i++) p[i] = i * 10;
    printf("%d\\n", p[1]);
    free(p);
    return 0;
}`,
    options: ['0', '10', '20', 'Error'],
    answer: 1,
    explanation: 'malloc으로 int 3개 크기의 동적 메모리 할당 후 0, 10, 20을 저장합니다. p[1]은 10입니다.',
  },
  {
    id: 'c_007',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드에서 포인터 연산 결과는?',
    code: `int arr[] = {5, 10, 15};
int *p = arr;
p++;
printf("%d\\n", *p);`,
    options: ['5', '10', '15', '6'],
    answer: 1,
    explanation: 'p++는 포인터를 다음 int 위치로 이동시킵니다(+4바이트). *p는 arr[1] = 10입니다.',
  },
  {
    id: 'c_008',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
#define SQ(x) ((x)*(x))
int main() {
    printf("%d\\n", SQ(3+1));
    return 0;
}`,
    options: ['7', '10', '16', '13'],
    answer: 2,
    explanation: 'SQ(3+1)은 ((3+1)*(3+1)) = 4*4 = 16으로 치환됩니다. 괄호 없으면 3+1*3+1=7이 되므로 괄호가 중요합니다.',
  },
  // ── hard ──
  {
    id: 'c_009',
    category: 'c',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int a = 5;
    int *p = &a;
    int **pp = &p;
    **pp = 99;
    printf("%d\\n", a);
    return 0;
}`,
    options: ['5', '99', 'Error', '주소값'],
    answer: 1,
    explanation: '**pp는 pp→p→a를 역참조합니다. **pp = 99는 a = 99와 같습니다.',
  },
  {
    id: 'c_010',
    category: 'c',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
#include <stdlib.h>
struct Node { int val; struct Node *next; };
int main() {
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    struct Node *second = (struct Node*)malloc(sizeof(struct Node));
    head->val = 1;  head->next = second;
    second->val = 2; second->next = NULL;
    printf("%d\\n", head->next->val);
    free(head); free(second);
    return 0;
}`,
    options: ['1', '2', 'NULL', 'Error'],
    answer: 1,
    explanation: 'head->next는 second를 가리킵니다. head->next->val은 second->val = 2입니다. 링크드 리스트 기본 탐색입니다.',
  },
]

// ───────────────────────────────────────────────
// SQL (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const sqlQuestions: Question[] = [
  // ── easy ──
  {
    id: 'sql_001',
    category: 'sql',
    difficulty: 'easy',
    question: '다음 SQL의 실행 결과로 맞는 것은?\n\nSELECT COUNT(*) FROM employees;',
    options: [
      '테이블의 특정 열 개수를 반환한다.',
      '테이블의 전체 행 수를 반환한다.',
      'NULL 값만 세어 반환한다.',
      '가장 큰 값을 반환한다.',
    ],
    answer: 1,
    explanation: 'COUNT(*)는 NULL 포함 전체 행 수를 반환합니다.',
  },
  {
    id: 'sql_002',
    category: 'sql',
    difficulty: 'easy',
    question: '테이블에서 salary가 3000 이상인 직원의 이름을 조회하는 올바른 SQL은?',
    options: [
      'SELECT name FROM employees HAVING salary >= 3000;',
      'SELECT name FROM employees WHERE salary >= 3000;',
      'SELECT name WHERE salary >= 3000 FROM employees;',
      'SELECT name FROM employees IF salary >= 3000;',
    ],
    answer: 1,
    explanation: 'WHERE 절은 행을 필터링하는 조건입니다. 올바른 순서는 SELECT→FROM→WHERE 입니다.',
  },
  {
    id: 'sql_003',
    category: 'sql',
    difficulty: 'easy',
    question: '테이블에 새 행을 삽입하는 DML 명령어는?',
    options: ['CREATE', 'INSERT INTO', 'UPDATE', 'ALTER'],
    answer: 1,
    explanation: 'INSERT INTO는 DML(Data Manipulation Language)로 새로운 행을 삽입합니다. CREATE/ALTER는 DDL입니다.',
  },
  {
    id: 'sql_004',
    category: 'sql',
    difficulty: 'easy',
    question: '다음 SQL에서 빈칸에 들어갈 올바른 키워드는?\n\nSELECT dept, _____ (salary) FROM employees GROUP BY dept;',
    options: ['TOTAL', 'SUM', 'ADD', 'COUNT'],
    answer: 1,
    explanation: 'SUM()은 집계함수로 그룹별 합계를 계산합니다. TOTAL이나 ADD는 SQL 집계함수가 아닙니다.',
  },
  // ── medium ──
  {
    id: 'sql_005',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 SQL의 실행 결과 행 수는?\n\n(orders 테이블: 5행, customers 테이블: 3행, 매칭되는 조인 결과: 4행)\n\nSELECT * FROM orders INNER JOIN customers ON orders.cid = customers.id;',
    options: ['3', '4', '5', '15'],
    answer: 1,
    explanation: 'INNER JOIN은 두 테이블에서 ON 조건을 만족하는 행만 반환합니다. 매칭 행이 4개이므로 결과는 4행입니다.',
  },
  {
    id: 'sql_006',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 SQL의 실행 결과는?\n\nSELECT dept, AVG(salary) FROM employees GROUP BY dept HAVING AVG(salary) > 5000;',
    options: [
      '모든 부서의 평균 급여를 반환한다.',
      '평균 급여가 5000 초과인 부서만 반환한다.',
      '급여가 5000 초과인 직원이 있는 부서를 반환한다.',
      'WHERE 절이 없어 오류가 발생한다.',
    ],
    answer: 1,
    explanation: 'HAVING은 GROUP BY 후 집계 결과를 필터링합니다. 그룹(부서) 평균이 5000 초과인 부서만 반환됩니다.',
  },
  {
    id: 'sql_007',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 서브쿼리의 실행 결과로 옳은 것은?\n\nSELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    options: [
      '모든 직원 이름을 반환한다.',
      '평균 급여보다 많이 받는 직원 이름을 반환한다.',
      '평균 급여를 반환한다.',
      '급여가 가장 높은 직원 이름만 반환한다.',
    ],
    answer: 1,
    explanation: '서브쿼리로 전체 평균 급여를 먼저 계산 후, 그보다 높은 급여를 받는 직원의 이름을 조회합니다.',
  },
  {
    id: 'sql_008',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 DDL 중 기존 테이블에 새 열을 추가하는 명령은?',
    options: [
      'CREATE TABLE employees ADD COLUMN phone VARCHAR(20);',
      'ALTER TABLE employees ADD COLUMN phone VARCHAR(20);',
      'UPDATE TABLE employees ADD phone VARCHAR(20);',
      'INSERT INTO employees (phone) VALUES (VARCHAR(20));',
    ],
    answer: 1,
    explanation: 'ALTER TABLE ... ADD COLUMN은 기존 테이블 구조를 변경(열 추가)하는 DDL 명령입니다.',
  },
  // ── hard ──
  {
    id: 'sql_009',
    category: 'sql',
    difficulty: 'hard',
    question: '다음 SQL의 실행 결과로 옳은 것은?\n\nSELECT a.name, b.name AS mgr\nFROM employees a\nLEFT JOIN employees b ON a.manager_id = b.id;',
    options: [
      '매니저가 있는 직원만 조회한다.',
      '모든 직원을 조회하며 매니저가 없으면 mgr이 NULL이다.',
      '매니저가 없는 직원만 조회한다.',
      '자기 자신과 조인하므로 오류가 발생한다.',
    ],
    answer: 1,
    explanation: '셀프 LEFT JOIN입니다. LEFT JOIN은 왼쪽 테이블(a) 전체를 보존하므로 매니저가 없는 경우 mgr = NULL로 반환됩니다.',
  },
  {
    id: 'sql_010',
    category: 'sql',
    difficulty: 'hard',
    question: '다음 SQL에서 WITH 절(CTE)의 설명으로 옳은 것은?\n\nWITH ranked AS (\n  SELECT name, salary,\n  RANK() OVER (ORDER BY salary DESC) AS rnk\n  FROM employees\n)\nSELECT name FROM ranked WHERE rnk = 1;',
    options: [
      'CTE는 인덱스를 생성하는 DDL이다.',
      'RANK()로 급여 순위를 매겨 1위 직원 이름을 조회한다.',
      '급여 합계를 계산해 최댓값 직원을 조회한다.',
      'WITH 절은 표준 SQL이 아니어서 지원하지 않는다.',
    ],
    answer: 1,
    explanation: 'CTE(Common Table Expression)는 쿼리 내 임시 결과셋입니다. RANK() 윈도우 함수로 급여 내림차순 순위를 매기고 1위(최고 급여) 직원을 조회합니다.',
  },
]

// ───────────────────────────────────────────────
// Python 2회차 (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const pythonQuestions2: Question[] = [
  // ── easy ──
  {
    id: 'python_011',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `x = "hello"
print(x.upper())`,
    options: ['hello', 'HELLO', 'Hello', 'Error'],
    answer: 1,
    explanation: 'str.upper()는 문자열 전체를 대문자로 변환합니다.',
  },
  {
    id: 'python_012',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `a = (1, 2, 3)
print(type(a).__name__)`,
    options: ['list', 'tuple', 'set', 'dict'],
    answer: 1,
    explanation: '소괄호 ()로 감싼 값은 tuple 타입입니다.',
  },
  {
    id: 'python_013',
    category: 'python',
    difficulty: 'easy',
    question: '파이썬에서 리스트의 마지막 요소를 제거하고 반환하는 메서드는?',
    options: ['remove()', 'pop()', 'delete()', 'discard()'],
    answer: 1,
    explanation: 'list.pop()은 마지막 요소를 제거하고 반환합니다. pop(i)는 i번째 요소를 제거합니다.',
  },
  {
    id: 'python_014',
    category: 'python',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `print(10 // 3)`,
    options: ['3.33', '3', '4', '1'],
    answer: 1,
    explanation: '// 는 정수 나눗셈(floor division) 연산자입니다. 10 // 3 = 3입니다.',
  },
  // ── medium ──
  {
    id: 'python_015',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `words = ['apple', 'banana', 'cherry']
result = sorted(words, key=len)
print(result[0])`,
    options: ['apple', 'banana', 'cherry', 'Error'],
    answer: 0,
    explanation: 'len을 key로 정렬하면 길이 순: apple(5), banana(6), cherry(6). 가장 짧은 apple이 result[0]입니다.',
  },
  {
    id: 'python_016',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `def gen():
    for i in range(3):
        yield i * 2

g = gen()
print(next(g))
print(next(g))`,
    options: ['0\\n2', '0\\n1', '2\\n4', 'Error'],
    answer: 0,
    explanation: 'yield는 제너레이터를 만듭니다. 첫 next()는 0*2=0, 두 번째는 1*2=2를 반환합니다.',
  },
  {
    id: 'python_017',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Error'],
    answer: 1,
    explanation: 'b = a는 같은 리스트 객체를 참조합니다. b.append(4)는 원본 a도 변경합니다. 복사하려면 b = a[:]를 사용합니다.',
  },
  {
    id: 'python_018',
    category: 'python',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `text = "a,b,c,d"
parts = text.split(",")
print(len(parts))`,
    options: ['3', '4', '7', '8'],
    answer: 1,
    explanation: '"a,b,c,d"를 ","로 split하면 ["a","b","c","d"] 4개의 요소가 생깁니다.',
  },
  // ── hard ──
  {
    id: 'python_019',
    category: 'python',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `from functools import reduce
nums = [1, 2, 3, 4, 5]
result = reduce(lambda acc, x: acc + x, nums, 10)
print(result)`,
    options: ['15', '25', '10', 'Error'],
    answer: 1,
    explanation: 'reduce의 초기값 10에서 시작해 1+2+3+4+5=15를 더합니다. 결과: 10+15=25.',
  },
  {
    id: 'python_020',
    category: 'python',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return super().method() + "B"

class C(B):
    def method(self):
        return super().method() + "C"

print(C().method())`,
    options: ['C', 'BC', 'ABC', 'ACB'],
    answer: 2,
    explanation: 'MRO 순서: C→B→A. C.method()는 B.method()+"C", B.method()는 A.method()+"B". 결과: "A"+"B"+"C" = "ABC".',
  },
]

// ───────────────────────────────────────────────
// Java 2회차 (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const javaQuestions2: Question[] = [
  // ── easy ──
  {
    id: 'java_011',
    category: 'java',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `int x = 5;
System.out.println(x++);
System.out.println(x);`,
    options: ['5\\n5', '5\\n6', '6\\n6', '6\\n5'],
    answer: 1,
    explanation: 'x++는 후위 증가로, 현재 값(5)을 먼저 출력한 후 1 증가합니다. 두 번째 출력은 6입니다.',
  },
  {
    id: 'java_012',
    category: 'java',
    difficulty: 'easy',
    question: 'Java에서 추상 클래스에 대한 설명으로 옳은 것은?',
    options: [
      '추상 클래스는 인스턴스를 직접 생성할 수 있다.',
      '추상 클래스는 abstract 메서드만 가질 수 있다.',
      '추상 클래스는 일반 메서드와 추상 메서드를 모두 가질 수 있다.',
      '추상 클래스는 extends가 아닌 implements로 상속받는다.',
    ],
    answer: 2,
    explanation: '추상 클래스(abstract class)는 인스턴스 생성 불가이며, 일반 메서드와 abstract 메서드를 모두 포함할 수 있습니다.',
  },
  {
    id: 'java_013',
    category: 'java',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `String s = "Hello World";
System.out.println(s.length());`,
    options: ['10', '11', '12', '5'],
    answer: 1,
    explanation: '"Hello World"는 공백 포함 11글자입니다. length()는 문자 수를 반환합니다.',
  },
  {
    id: 'java_014',
    category: 'java',
    difficulty: 'easy',
    question: 'Java에서 정수형 자료형 중 가장 큰 범위를 가지는 것은?',
    options: ['byte', 'short', 'int', 'long'],
    answer: 3,
    explanation: 'long은 64비트 정수형으로 약 ±9.2×10¹⁸ 범위입니다. int는 32비트(약 ±21억)입니다.',
  },
  // ── medium ──
  {
    id: 'java_015',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `import java.util.*;
Stack<Integer> st = new Stack<>();
st.push(1); st.push(2); st.push(3);
System.out.println(st.pop());
System.out.println(st.peek());`,
    options: ['1\\n2', '3\\n2', '3\\n3', '1\\n1'],
    answer: 1,
    explanation: 'Stack은 LIFO입니다. pop()은 최상단 3을 제거 후 반환, peek()는 제거 없이 현재 최상단 2를 반환합니다.',
  },
  {
    id: 'java_016',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `public class Main {
    static int x = 10;
    public static void change(int x) {
        x = 99;
    }
    public static void main(String[] args) {
        change(x);
        System.out.println(x);
    }
}`,
    options: ['99', '10', '0', 'Error'],
    answer: 1,
    explanation: '메서드 매개변수 x는 지역 변수로, static 변수 x와 별개입니다. change() 내에서 바꿔도 static x에는 영향 없습니다.',
  },
  {
    id: 'java_017',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `import java.util.*;
List<String> list = new ArrayList<>();
list.add("a"); list.add("b"); list.add("c");
list.remove(1);
System.out.println(list);`,
    options: ['[a, b, c]', '[a, c]', '[b, c]', '[a, b]'],
    answer: 1,
    explanation: 'remove(1)은 인덱스 1("b")을 제거합니다. 결과: ["a", "c"].',
  },
  {
    id: 'java_018',
    category: 'java',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `interface Greet {
    default String hello() { return "Hello"; }
}
class MyClass implements Greet {
    public String hello() { return "Hi"; }
}
Greet g = new MyClass();
System.out.println(g.hello());`,
    options: ['Hello', 'Hi', 'Error', 'null'],
    answer: 1,
    explanation: 'MyClass가 default 메서드를 오버라이딩했으므로 "Hi"가 출력됩니다. 런타임에 실제 구현체의 메서드가 호출됩니다.',
  },
  // ── hard ──
  {
    id: 'java_019',
    category: 'java',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `import java.util.stream.*;
import java.util.*;
List<Integer> nums = Arrays.asList(1,2,3,4,5);
int result = nums.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(Integer::intValue)
    .sum();
System.out.println(result);`,
    options: ['6', '9', '15', '2'],
    answer: 0,
    explanation: 'filter로 짝수(2,4)만 추출 후 sum()으로 합산합니다. 2+4=6.',
  },
  {
    id: 'java_020',
    category: 'java',
    difficulty: 'hard',
    question: '다음 코드에서 출력되는 값은?',
    code: `class Parent {
    Parent() { System.out.print("P "); }
}
class Child extends Parent {
    Child() {
        super();
        System.out.print("C ");
    }
}
class GrandChild extends Child {
    GrandChild() {
        super();
        System.out.print("G ");
    }
}
new GrandChild();`,
    options: ['G C P ', 'P C G ', 'C P G ', 'G P C '],
    answer: 1,
    explanation: '생성자는 super()를 통해 최상위 부모부터 순서대로 실행됩니다. Parent → Child → GrandChild 순으로 "P C G "가 출력됩니다.',
  },
]

// ───────────────────────────────────────────────
// C언어 2회차 (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const cQuestions2: Question[] = [
  // ── easy ──
  {
    id: 'c_011',
    category: 'c',
    difficulty: 'easy',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int i;
    for (i = 0; i < 3; i++) {
        printf("%d ", i);
    }
    return 0;
}`,
    options: ['0 1 2 3', '0 1 2', '1 2 3', '1 2 3 4'],
    answer: 1,
    explanation: 'i는 0, 1, 2까지 순환하며 i < 3 조건이 거짓(i=3)이 되면 종료됩니다.',
  },
  {
    id: 'c_012',
    category: 'c',
    difficulty: 'easy',
    question: '다음 C언어에서 문자열의 길이를 반환하는 함수는?',
    options: ['strlen()', 'sizeof()', 'length()', 'strlength()'],
    answer: 0,
    explanation: 'strlen()은 <string.h>에 선언된 함수로, 널 문자(\\0)를 제외한 문자열 길이를 반환합니다.',
  },
  {
    id: 'c_013',
    category: 'c',
    difficulty: 'easy',
    question: '다음 코드에서 sizeof(arr)의 결과는?\n\nint arr[5];',
    options: ['5', '10', '20', '4'],
    answer: 2,
    explanation: 'int는 4바이트이고 요소가 5개이므로 sizeof(arr) = 4 × 5 = 20바이트입니다.',
  },
  {
    id: 'c_014',
    category: 'c',
    difficulty: 'easy',
    question: '다음 C코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int a = 10;
    if (a > 5)
        printf("yes");
    else
        printf("no");
    return 0;
}`,
    options: ['no', 'yes', 'yes no', 'Error'],
    answer: 1,
    explanation: 'a=10 > 5이므로 if 블록의 "yes"가 출력됩니다.',
  },
  // ── medium ──
  {
    id: 'c_015',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int rec(int n) {
    if (n <= 1) return 1;
    return n * rec(n - 1);
}
int main() {
    printf("%d\\n", rec(4));
    return 0;
}`,
    options: ['4', '8', '24', '16'],
    answer: 2,
    explanation: '재귀 팩토리얼 함수입니다. rec(4)=4×rec(3)=4×3×rec(2)=4×3×2×rec(1)=4×3×2×1=24.',
  },
  {
    id: 'c_016',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
#include <string.h>
int main() {
    char s[] = "Hello";
    printf("%d\\n", (int)strlen(s));
    return 0;
}`,
    options: ['4', '5', '6', '10'],
    answer: 1,
    explanation: '"Hello"는 H,e,l,l,o 5글자입니다. strlen은 널 문자 제외 5를 반환합니다.',
  },
  {
    id: 'c_017',
    category: 'c',
    difficulty: 'medium',
    question: '다음 구조체 코드의 출력 결과는?',
    code: `#include <stdio.h>
typedef struct { int x; int y; } Point;
Point add(Point a, Point b) {
    Point r = {a.x + b.x, a.y + b.y};
    return r;
}
int main() {
    Point p1 = {1, 2}, p2 = {3, 4};
    Point p3 = add(p1, p2);
    printf("%d %d\\n", p3.x, p3.y);
    return 0;
}`,
    options: ['1 2', '3 4', '4 6', '2 4'],
    answer: 2,
    explanation: 'add 함수는 두 Point의 x, y를 각각 더합니다. x: 1+3=4, y: 2+4=6.',
  },
  {
    id: 'c_018',
    category: 'c',
    difficulty: 'medium',
    question: '다음 코드에서 p가 NULL인지 확인하는 올바른 방법은?\n\nint *p = malloc(sizeof(int));',
    options: [
      'if (p == 0)',
      'if (p == NULL)',
      'if (!p)',
      '위 세 가지 모두 유효하다',
    ],
    answer: 3,
    explanation: 'NULL은 0으로 정의되어 있습니다. p == NULL, p == 0, !p는 모두 동일하게 NULL 체크를 수행합니다.',
  },
  // ── hard ──
  {
    id: 'c_019',
    category: 'c',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
void f(int *arr, int n) {
    for (int i = 0; i < n / 2; i++) {
        int tmp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = tmp;
    }
}
int main() {
    int a[] = {1, 2, 3, 4, 5};
    f(a, 5);
    printf("%d %d\\n", a[0], a[4]);
    return 0;
}`,
    options: ['1 5', '5 1', '3 3', '5 5'],
    answer: 1,
    explanation: '배열을 역순으로 뒤집는 함수입니다. {1,2,3,4,5} → {5,4,3,2,1}. a[0]=5, a[4]=1.',
  },
  {
    id: 'c_020',
    category: 'c',
    difficulty: 'hard',
    question: '다음 코드의 출력 결과는?',
    code: `#include <stdio.h>
int main() {
    int a = 5, b = 3;
    int *p = &a, *q = &b;
    *p = *p + *q;
    *q = *p - *q;
    *p = *p - *q;
    printf("%d %d\\n", a, b);
    return 0;
}`,
    options: ['5 3', '3 5', '8 3', '5 8'],
    answer: 1,
    explanation: '포인터를 이용한 XOR 없는 swap입니다. a=5+3=8, b=8-3=5, a=8-5=3. 최종: a=3, b=5.',
  },
]

// ───────────────────────────────────────────────
// SQL 2회차 (easy×4, medium×4, hard×2)
// ───────────────────────────────────────────────
const sqlQuestions2: Question[] = [
  // ── easy ──
  {
    id: 'sql_011',
    category: 'sql',
    difficulty: 'easy',
    question: '다음 SQL에서 중복 행을 제거하는 키워드는?\n\nSELECT _____ dept FROM employees;',
    options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'FILTER'],
    answer: 1,
    explanation: 'DISTINCT는 SELECT 결과에서 중복 값을 제거합니다.',
  },
  {
    id: 'sql_012',
    category: 'sql',
    difficulty: 'easy',
    question: '다음 SQL의 실행 결과로 옳은 것은?\n\nSELECT MAX(salary) FROM employees;',
    options: [
      '급여 평균을 반환한다.',
      '급여 최댓값을 반환한다.',
      '급여 합계를 반환한다.',
      '급여 최솟값을 반환한다.',
    ],
    answer: 1,
    explanation: 'MAX()는 집계 함수로 지정한 열의 최댓값을 반환합니다.',
  },
  {
    id: 'sql_013',
    category: 'sql',
    difficulty: 'easy',
    question: '다음 중 기존 행의 데이터를 수정하는 DML 명령어는?',
    options: ['ALTER', 'MODIFY', 'UPDATE', 'CHANGE'],
    answer: 2,
    explanation: 'UPDATE ... SET ... WHERE 는 기존 행의 값을 수정하는 DML입니다. ALTER는 테이블 구조를 변경하는 DDL입니다.',
  },
  {
    id: 'sql_014',
    category: 'sql',
    difficulty: 'easy',
    question: '테이블에서 모든 행을 삭제하지만 테이블 구조는 유지하는 명령어는?',
    options: ['DROP TABLE', 'DELETE FROM', 'REMOVE FROM', 'TRUNCATE TABLE'],
    answer: 3,
    explanation: 'TRUNCATE TABLE은 모든 행을 빠르게 삭제하고 구조는 유지합니다. DELETE는 조건 지정 가능, DROP은 테이블 자체를 삭제합니다.',
  },
  // ── medium ──
  {
    id: 'sql_015',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 SQL의 실행 순서로 올바른 것은?\n\nSELECT dept, COUNT(*)\nFROM employees\nWHERE salary > 3000\nGROUP BY dept\nHAVING COUNT(*) > 2\nORDER BY dept;',
    options: [
      'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
      'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
      'FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY',
      'WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY',
    ],
    answer: 1,
    explanation: 'SQL 논리 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY입니다.',
  },
  {
    id: 'sql_016',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 SQL의 결과로 옳은 것은?\n\nSELECT * FROM A LEFT JOIN B ON A.id = B.a_id\nWHERE B.a_id IS NULL;',
    options: [
      'A와 B에 모두 존재하는 행만 반환한다.',
      'A에만 존재하고 B에 매칭되지 않는 행을 반환한다.',
      'B에만 존재하는 행을 반환한다.',
      '모든 행을 반환한다.',
    ],
    answer: 1,
    explanation: 'LEFT JOIN 후 B.a_id IS NULL 조건은 A에는 있지만 B에 매칭 행이 없는 경우만 필터링합니다. Anti-join 패턴입니다.',
  },
  {
    id: 'sql_017',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 SQL에서 IN 연산자의 설명으로 옳은 것은?\n\nSELECT name FROM employees\nWHERE dept IN (\'HR\', \'IT\', \'Sales\');',
    options: [
      'dept가 세 값 중 어느 하나와 일치하는 행을 반환한다.',
      'dept가 세 값 모두와 일치하는 행을 반환한다.',
      'dept가 세 값 중 어느 것도 아닌 행을 반환한다.',
      'IN은 숫자형에만 사용 가능하다.',
    ],
    answer: 0,
    explanation: 'IN 연산자는 OR 조건의 축약입니다. dept = \'HR\' OR dept = \'IT\' OR dept = \'Sales\'와 동일합니다.',
  },
  {
    id: 'sql_018',
    category: 'sql',
    difficulty: 'medium',
    question: '다음 DDL 중 테이블을 삭제하는 명령어와 그 특성으로 옳은 것은?',
    options: [
      'DELETE TABLE: 데이터와 구조 모두 삭제, 롤백 가능',
      'DROP TABLE: 데이터와 구조 모두 삭제, 롤백 불가(DDL)',
      'TRUNCATE TABLE: 테이블 구조도 함께 삭제됨',
      'REMOVE TABLE: 표준 SQL 명령어이다',
    ],
    answer: 1,
    explanation: 'DROP TABLE은 데이터와 테이블 구조를 모두 삭제하는 DDL로 자동 커밋됩니다. 롤백이 불가합니다.',
  },
  // ── hard ──
  {
    id: 'sql_019',
    category: 'sql',
    difficulty: 'hard',
    question: '다음 SQL의 결과로 옳은 것은?\n\nSELECT dept,\n  SUM(salary) OVER (PARTITION BY dept ORDER BY hire_date) AS running_total\nFROM employees;',
    options: [
      '부서별 급여 합계를 하나의 행으로 반환한다.',
      '각 직원의 부서 내 입사일 순 누적 급여 합계를 반환한다.',
      '전체 직원의 급여 합계만 반환한다.',
      'GROUP BY 없이 집계할 수 없어 오류가 발생한다.',
    ],
    answer: 1,
    explanation: 'OVER(PARTITION BY dept ORDER BY hire_date)는 윈도우 함수로, 부서별로 입사일 순서에 따른 누적 합계를 각 행에 붙여 반환합니다.',
  },
  {
    id: 'sql_020',
    category: 'sql',
    difficulty: 'hard',
    question: '다음 SQL에서 EXISTS의 동작으로 옳은 것은?\n\nSELECT name FROM employees e\nWHERE EXISTS (\n  SELECT 1 FROM orders o WHERE o.emp_id = e.id\n);',
    options: [
      'orders 테이블에 행이 하나도 없을 때만 직원을 반환한다.',
      '주문이 하나 이상 있는 직원의 이름을 반환한다.',
      'orders.emp_id가 NULL인 직원만 반환한다.',
      'SELECT 1은 문법 오류를 발생시킨다.',
    ],
    answer: 1,
    explanation: 'EXISTS는 서브쿼리가 하나 이상의 행을 반환하면 TRUE입니다. 각 직원(e)에 대해 orders에 매칭 행이 있으면 이름을 반환합니다.',
  },
]

export const questions: Question[] = [
  ...pythonQuestions,
  ...javaQuestions,
  ...cQuestions,
  ...sqlQuestions,
  ...pythonQuestions2,
  ...javaQuestions2,
  ...cQuestions2,
  ...sqlQuestions2,
]

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'c', label: 'C언어' },
  { id: 'sql', label: 'SQL' },
]

export function getQuestionsByCategory(categories: Category[]): Question[] {
  return questions.filter((q) => categories.includes(q.category))
}
