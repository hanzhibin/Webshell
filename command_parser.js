
function command_parser()
{
    var command = {};

    this.parse = function(cmd_array, term)
    {
        var name = cmd_array.shift();
        var rpc = null;

        switch (name)
        {
            case "help":
                print_help_help(term);
                break;
            case "machine":
                //print_help_machine(term);
                rpc = parse_machine_option(cmd_array);
                break;
            case "job":
                print_help_job(term);
                break;
            default:
                break;
        }
        return rpc;
    }


    function print_help_help(term)
    {
        var help = [
                       "Usage: help  [command]\n",
                       "Description: By default, it displays all the commands supported in this tool. if the command is specified,",
                       "\tIt will print out the corresponding help info of the command.",
                       "Commands:",
                       "\tmachine - list, search, and send job to machines which is managed by the system.",
                       "\tjob     - list, track the running machine.",
                       "\n"
                   ];
        _print_help(help, term);
    }
    
    function print_help_machine(term)
    {
        var help = [
                       "Usage: machine [options] [id]\n",
                       "Description: if no options specified, this command will print all the machines in the system.",
                       "\t\tif machine id is specified, the detail info of that machine will be displayed.",
                       "Options:",
                       "\t-h - print this help infomation.",
                       "\t-l - list, search, and send job to machines which is managed by the system.",
                       "\t-s - list, track the running machine.",
                       "\n"
                   ];
        _print_help(help, term);

    }

    function print_help_job( term )
    {
        var foo = new $.JsonRpcClient(
                                      { ajaxUrl: 'rpc_handler.php',
                                        contentType:"application/json; charset=utf-8" });
        foo.call(
                'list_machine', [],
                function(result) { term.echo('Foo bar answered: ' + $.toJSON(result)); },
                function(error)  { term.echo('There was an error', error); }
            );
    }


    function _print_help( helps, term )
    {
        $.each(helps, function(index, line){
            term.echo(line);
        }); 
    }

    function parse_machine_option(opts)
    {
        var args = [];
        var rpc = {category:'machine', args:[], name:""};
        $.each(opts, function(index, opt){
             if (opt == '-h')
             {
                 print_help_machine();
                 return;
             }
             else if (opt == '-s')
             {
                 rpc.name = 'machine_search';
             }
             else if (opt == '-l')
             {
                 rpc.name = 'machine_list';
             }
             else {
                 rpc.args.push(opt);
             }

        });
        if ( !rpc.name )
        {
            rpc.name = 'machine_get';
            
            if ( rpc.args.length == 0 )
            {
                rpc.name = 'machine_list';
            }
        }

        return rpc;
    }
}
