using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace projClass
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            CTest test = new CTest();
            CTest test2 = new CTest();
            test.setData(0);
            test2.setData(1);
            MessageBox.Show("testは" + test.getData());
            MessageBox.Show("test2は" + test2.getData());


            CTest[] tests = new CTest[10];  // 10個の配列を生成
            for (int i = 0; i < 10; i++)
            {
                tests[i] = new CTest();     // CTestのインスタンスを生成
                tests[i].Start();
                MessageBox.Show("staticのデータは" + CTest.getClData());
            }
            for (int i = 0; i < 10; i++)
            {
                tests[i].OnDestroy();
                MessageBox.Show("staticのデータは" + CTest.getClData());
            }

        }
    }
}
