<?php

class machine
{

  public function __construct()
  {
    
    #connect to database
    $this->db = new mysql_pdo();

  }

  
  public function machine_list()
  {

    $this->db->pre('SELECT unique_id,name,arch.arch,ip,product.product,release.release,
                     memsize,disksize,description,machine_status.machine_status,
                     anomaly,serialconsole,powerswitch,consoledevice,consolespeed,
                     default_option,type,powertype,powerslot,
                     kernel,`usage` FROM machine 
                     LEFT JOIN arch on machine.arch_id=arch.arch_id 
                     LEFT JOIN machine_status on machine.machine_status_id=machine_status.machine_status_id
                     LEFT JOIN product on product.product_id=machine.product_id 
                     LEFT JOIN `release` on machine.release_id=release.release_id');
    return $this->db->exe();
  }
  public function machine_get($name)
  {
    $this->db->pre('SELECT unique_id,name,arch.arch,ip,product.product,release.release,
                     memsize,disksize,description,machine_status.machine_status,
                     anomaly,serialconsole,powerswitch,consoledevice,consolespeed,
                     default_option,type,powertype,powerslot,
                     kernel,`usage` FROM machine 
                     LEFT JOIN arch on machine.arch_id=arch.arch_id 
                     LEFT JOIN machine_status on machine.machine_status_id=machine_status.machine_status_id
                     LEFT JOIN product on product.product_id=machine.product_id 
                     LEFT JOIN `release` on machine.release_id=release.release_id where machine.name=:name');
    $this->db->bind(':name',$name);
    return $this->db->exe();
    

  }
  public function machine_search($str)
  {
    $new_all = array();
    $all=$this->machine_list();
    foreach($all as $machine)
    {
     if(preg_match("/$str/",$machine['name'])) $new_all[]=$machine;
    }
  return $new_all;

  }

}


?>

