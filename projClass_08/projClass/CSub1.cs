using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace projClass
{
    class CSub1 : CSuper
    {
        public override void disp()
        {
            System.Windows.Forms.MessageBox.Show("this is CSub1.");
        }
    }
}
