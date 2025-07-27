#include<iostream>
#include<vector>
using namespace std;

class student{
private:
    int marks;
    double rollno;
public:
    void getData(){
    cin>>rollno>>marks;
    }
    void showData(){
     cout <<"The marks of the roll no "<<rollno<<" is "<< marks<<endl;
    }
    int showMarks(){
      return marks;
    }

};
int main(){
    int n;
    cin>>n;
    vector<student> s(n);

    for(int i=0;i<n;i++){
        cout<<"Enter the Details of the student "<<i+1<<" (rollno&marks):";
        s[i].getData();
    }
    for (int i=0;i<n;i++){
        s[i].showData();
    }

    for(int i=0;i<n;i++){

        for(int j=i+1 ; j<n;j++){
            if(s[i].showMarks()<s[j].showMarks()){
            student temp = s[i];
            s[i]=s[j];
            s[j]=temp;
           }
        }

    }
    cout<<"---Merit List is ---"<<endl;
    for (int i=0;i<n;i++){
        s[i].showData();
    }
    cout<<"---Top 10% and bottom 10% are--"<<endl;
    int topCount = max(1, n * 10 / 100);
    for(int i=0;i<topCount;i++){
        s[i].showData();

    }
    for (int i=n-topCount;i<n;i++){
        s[i].showData();
    }

    return 0;
}



#include<iostream>
using namespace std;

int reverseArr(int arr[],int sz){
    int start = 0 , ed=sz-1;

    while(start<=ed){
        swap(arr[start],arr[ed]);
        start++;
        ed--;
    }

}

int main(){
    int arr[]={1,2,3,4,5};
    int sz=5;
    reverseArr(arr,sz);

    for(int i=0;i<sz;i++){
        cout<<arr[i];
    }

    return 0;
}

#include <iostream>
using namespace std;

int main(){
    cout<<"Enter a no to win";
    cin>>n;
    if (n==0){
        cout<<"you just won the game"<<endl;
    }
}


#include <iostream>
using namespace std;

int main(){
    cout<<"Enter a no to win";
    int n;
    cin>>n;
    int m=1;
    for (int i =2;i<n;i++){
        if (n%i==0){
            m=0;
        }
    }

    if (m){
        cout<<"the no is prime"<<endl;
    }else{
        cout<<"the no is not prime"<<endl;
    }
}


#include<iostream>
using namespace std;

int main(){

    int n;
    cin>>n;//42
    int rema=0;
    int sum=0;
    int m=1;

    while(n>0){
        rema=n%2;
        n=n/2;
        sum=sum+rema*m;
        m*=10;

    }
    cout<<sum<<endl;
    return 0;
}

