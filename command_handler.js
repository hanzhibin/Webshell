
function command_handler(p)
{
    /*var rpc =     {
                        category : 'machine | job | other'
                        name : 'func_name',
                        args: [],
                    };
   */
    this.parser = p;

    this.run = function(rpc, result_callback, error_callback)
    {
        var h_rpc = null;
        
        if (rpc.category == 'machine')
        {
            //h_rpc = new $.JsonRpcClient({ajaxUrl: 'machine_rpc.php'});
            h_rpc = new $.JsonRpcClient({ajaxUrl: 'rpc_handler.php'});
        }
        else if (rpc.category == 'job')
        {
            h_rpc = new $.JsonRpcClient({ajaxUrl: 'job_rpc.php'});
        }
        else {}
        
        h_rpc.call(
                rpc.name, rpc.args,
                function(result) { console.log(rpc.name + "  "  + $.toJSON(result)); },
                function(error)  { console.log('There was an error', $.toJSON(error)); }
        );
    }
}
