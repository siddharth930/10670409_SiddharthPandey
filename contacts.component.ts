import { Component, OnInit } from '@angular/core';
import { ContactService } from './contacts.service';
import { Contact } from './contact';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contact:Contact;
  contactlist:Contact[];
  showinsert:boolean;
  updating:boolean;
  searchterm:string;
  sortDesc:boolean;
  myForm:FormGroup;
  constructor(private contactSer: ContactService ) 
  { this.updating=false;
    this.sortDesc=true;
    this.showinsert=false;
    this.contact=new Contact();
    this.contactlist=[];
    this.contactlist=this.contactSer.returncontactlist();
    this.myForm=new FormGroup({
      firstName:new FormControl(null, Validators.required),
      secondName:new FormControl(null, Validators.required),
      phone:new FormControl(null, Validators.required)
    });

  }
  public get firstName()
  {
    return this.myForm.get('firstName');
  }
  public get secondName()
  {
    return this.myForm.get('secondName');
  }
  public get phone()
  {
    return this.myForm.get('phone');
  }

   addtocontact()
   {
    console.log(this.myForm);
    if(this.myForm.valid)
    {
    this.contact.firstName=this.firstName.value;
    this.contact.secondName=this.secondName.value;
    this.contact.phone=this.phone.value;
    this.contactSer.addcontact(this.contact);
      this.myForm.reset();
    this.contactlist=this.contactSer.returncontactlist();
    this.showinsert=false;
    this.contact=new Contact();
    
  }
  
    
   }
   hideinsert()
   {
     this.showinsert=false;
   }

showpopup()
{
  this.showinsert=true;
}
hideupdate()
{
  this.updating=false;
}
   deletefromlist(num)
   {
     
     this.contactlist=this.contactSer.delete(num);
    // console.log(this.contactlist)
   }
  ngOnInit(): void {
  }
  updatepopup(c)
  { this.contact=new Contact();
    this.updating=true;
    this.contact.firstName=c.firstName;
    this.contact.secondName=c.secondName;
    this.contact.phone=c.phone;
  }

  updatecontact(fname, sname, pnum)
  { if(pnum.value!="")
    {
    this.contact=new Contact();
    this.contact.firstName=fname.value;
    this.contact.secondName=sname.value;
    this.contact.phone=pnum.value;
    this.contactlist=this.contactSer.updatetocontact(this.contact);
    this.updating=false;
    }
  }
  sortarray()
{   this.sortDesc=!this.sortDesc;
    this.contactlist=this.contactSer.sortarray(this.sortDesc);
}
search()
{ 
  if(this.searchterm!="")
  {
    this.contactlist=this.contactSer.searchcontacts(this.searchterm);
  }
  else
  {
    this.contactlist=this.contactSer.returncontactlist();
  }
}

}
