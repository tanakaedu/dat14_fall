using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace projClass
{
    class CTest
    {
        // データを記録する
        private int data = 0;
        // クラス変数
        private static int cldata = 0;

        // 生成時に呼ばれる関数
        public void Start()
        {
            cldata++;
        }

        // 解放時に呼ばれる関数
        public void OnDestroy()
        {
            cldata--;
        }

        // データを設定する
        public void setData(int dt)
        {
            data = dt;
        }

        // データを返す
        public int getData()
        {
            return data;
        }

        public static void setClData(int dt) {
            cldata = dt;
        }
        public static int getClData() {
            return cldata;
        }

    }
}
